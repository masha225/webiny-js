import { app, File, Image } from "webiny-api";
import { User, app as securityApp, JwtToken, credentialsStrategy } from "webiny-api-security";
import { MySQLDriver } from "webiny-entity-mysql";
import imageProcessor from "webiny-jimp";
import LocalDriver from "webiny-file-storage-local";
import { Storage } from "webiny-file-storage";
import addDays from "date-fns/add_days";
import { connection } from "./database";
import myApp from "./../myApp";
//import { app as cmsApp } from "webiny-api-cms";

export default () => {
    // Configure default storage
    const localDriver = new LocalDriver({
        directory: __dirname + "/storage",
        createDatePrefix: false,
        publicUrl: "https://cdn.domain.com"
    });

    app.configure({
        entity: {
            // Instantiate driver with DB connection
            driver: new MySQLDriver({ connection }),
            // Configure entity attributes
            attributes: ({ bufferAttribute, fileAttributes, imageAttributes }) => {
                bufferAttribute();
                fileAttributes({
                    entity: File,
                    storage: new Storage(localDriver)
                });
                imageAttributes({
                    entity: Image,
                    processor: imageProcessor(),
                    quality: 90,
                    storage: new Storage(localDriver)
                });
            }
        }
    });

    app.use(
        securityApp({
            authentication: {
                token: new JwtToken({ secret: "MyS3cr3tK3Y" }),
                strategies: {
                    credentials: credentialsStrategy()
                },
                identities: [
                    {
                        identity: User,
                        authenticate: [
                            {
                                strategy: "credentials",
                                expiresOn: args => addDays(new Date(), args.remember ? 30 : 1),
                                field: "loginSecurityUser"
                            }
                        ]
                    }
                ]
            }
        })
    );

    app.use(myApp());

    /*app.use(cmsApp({}));*/

    return app;
};

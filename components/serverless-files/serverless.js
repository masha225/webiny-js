const { join } = require("path");
const { configureS3, configureApiGateway } = require("./components");
const { Component } = require("@serverless/core");

/**
 * This component needs to deploy:
 * - S3 bucket
 * - API GW for /graphql, /read, /upload
 */
class FilesComponent extends Component {
    async default(inputs = {}) {
        const { bucket = "webiny-files", ...rest } = inputs;
        const plugins = ["@webiny/api-files/plugins"];

        // Create S3 bucket for storing files.
        const s3 = await this.load("@serverless/aws-s3");
        const s3Output = await s3({ name: bucket });
        await configureS3(s3Output);

        const lambda0 = await this.load("@serverless/function", "image-processor");
        const lambda0Result = await lambda0({
            name: "Files component - image processor",
            timeout: 10,
            code: join(__dirname, "build/fileProcessors/images"),
            handler: "handler.handler",
            description:
                "Performs various tasks on image files like e.g. image optimization or image resizing.",
            env: {
                S3_BUCKET: bucket
            }
        });

        // Deploy read/upload lambdas
        const lambda1 = await this.load("@serverless/function", "download");
        const readFn = await lambda1({
            name: "Files component - download files",
            timeout: 10,
            code: join(__dirname, "build", "download"),
            handler: "handler.handler",
            description: "Serves previously uploaded files.",
            env: {
                S3_BUCKET: bucket,
                IMAGE_PROCESSOR_LAMBDA_NAME: lambda0Result.name
            }
        });

        // Deploy graphql API
        const apolloService = await this.load("@webiny/serverless-apollo-service");
        const apolloOutput = await apolloService({
            plugins,
            endpoints: [{ path: "/files/{path}", method: "ANY", function: readFn.arn }],
            ...rest
        });

        await configureApiGateway(apolloOutput.api);

        const output = {
            api: apolloOutput.api,
            s3: s3Output,
            cdnOrigin: {
                url: apolloOutput.api.url,
                pathPatterns: {
                    // TODO: potweakaj kako ti pase
                    "/read": {
                        ttl: 60
                    }
                }
            }
        };

        this.state.output = output;
        await this.save();

        return output;
    }

    async remove(inputs = {}) {
        // TODO: remove all created resources
    }
}

module.exports = FilesComponent;
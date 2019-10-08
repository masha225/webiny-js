// @flow
const S3 = require("aws-sdk/clients/s3");
const processImage = require("./processImage");
const optimizeImage = require("./optimizeImage");
const { getEnvironment, promisifyS3ObjectFunction } = require("./../../utils");

module.exports.handler = async ({ body: { options, params } }) => {
    try {
        const env = getEnvironment();
        const s3Client = new S3({ region: env.region });
        const s3 = {
            createObject: promisifyS3ObjectFunction({ s3: s3Client, action: "putObject" }),
            deleteObject: promisifyS3ObjectFunction({ s3: s3Client, action: "deleteObject" }),
            getObject: promisifyS3ObjectFunction({ s3: s3Client, action: "getObject" })
        };

        let originalS3Object;

        // 1. Get original image.
        try {
            originalS3Object = await s3.getObject({ params: params.original });
        } catch (e) {
            // If not found, try to create it by loading the initial image.
            originalS3Object = await s3.getObject({ params: params.initial });

            await s3.createObject({
                params: {
                    ...params.original,
                    ContentType: originalS3Object.ContentType,
                    Body: await optimizeImage(originalS3Object.Body, originalS3Object.ContentType)
                }
            });

            originalS3Object = await s3.getObject({ params: params.original });
            await s3.deleteObject({ params: params.initial });
        }

        if (!options.hasOptions) {
            return { error: false, message: "" };
        }

        await s3.createObject({
            params: {
                ...params.processed,
                ContentType: originalS3Object.ContentType,
                Body: await processImage(originalS3Object.Body, options.options)
            }
        });

        return { error: false, message: "" };
    } catch (e) {
        return { error: true, message: e.message };
    }
};

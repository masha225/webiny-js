// @flow
import { type ModelPluginType } from "webiny-api/types";
import { File } from "webiny-api-files/entities";

const file: ModelPluginType = {
    name: "model-file",
    type: "model",
    model: File
};

export default [file];

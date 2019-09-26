// @flow
import React from "react";
import OEmbed from "@webiny/app-page-builder/render/components/OEmbed";
import type { PbRenderElementPluginType } from "@webiny/app-page-builder/types";

export default (): PbRenderElementPluginType => {
    return {
        name: "pb-render-page-element-codesandbox",
        type: "pb-render-page-element",
        elementType: "codesandbox",
        render(props) {
            return <OEmbed element={props.element} />;
        }
    };
};

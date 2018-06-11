import React from "react";
import { EditorWidget } from "webiny-app-cms";
import Widget from "./Widget";
import widgetImage from "./text.png";

class ParagraphWidget extends EditorWidget {
    renderSelector() {
        return <img src={widgetImage} width={"100%"} />;
    }

    renderWidget({ WidgetContainer }) {
        return (
            <WidgetContainer>{({ widgetProps }) => <Widget {...widgetProps} />}</WidgetContainer>
        );
    }

    renderSettings({ WidgetSettingsContainer }) {
        return (
            <WidgetSettingsContainer>
                {({ styleGroup, presetGroup }) => [
                    presetGroup(),
                    // Register style settings using the built-in HOC
                    styleGroup()
                ]}
            </WidgetSettingsContainer>
        );
    }
}

export default ParagraphWidget;

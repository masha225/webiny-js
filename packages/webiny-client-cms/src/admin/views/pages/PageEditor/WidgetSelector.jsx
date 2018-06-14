import React from "react";
import classSet from "classnames";
import { Component } from "webiny-client";
import styles from "./Widget.scss";

@Component({ services: ["cms"] })
class Widget extends React.Component {
    render() {
        const {
            widget,
            services: { cms },
            onClick
        } = this.props;

        let editorWidget = cms.getEditorWidget(widget.type);
        if (!editorWidget) {
            return null;
        }

        return (
            <div className={classSet(styles.editorWidget)} onClick={onClick}>
                {editorWidget.widget.renderSelector()}
            </div>
        );
    }
}

export default Widget;

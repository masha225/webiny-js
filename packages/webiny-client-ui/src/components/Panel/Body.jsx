import React from 'react';
import classSet from "classnames";
import { Component } from 'webiny-client';
import styles from './styles.css?prefix=wui-panel';

@Component({ styles })
class Body extends React.Component {
    render() {
        if (this.props.render) {
            return this.props.render.call(this);
        }

        const classes = classSet(this.props.styles.body, this.props.className);
        return <div style={this.props.style} className={classes}>{this.props.children}</div>;
    }
}

Body.defaultProps = {
    style: null
};

export default Body;
const path = require('path');
const fs = require('fs-extra');
const webpack = require('webpack');
const _ = require('lodash');
const yaml = require('js-yaml');
const Webiny = require('webiny-cli/lib/webiny');

class Build {
    constructor(config) {
        this.config = config;
        this.baseAppConfig = require('./webpack/app')();
    }

    run() {
        Webiny.log(`\n--------------------------------------------------------------------------`);
        Webiny.info('Please be patient, the production build may take a while...');
        Webiny.log('--------------------------------------------------------------------------');

        const appConfig = this.getAppConfig();
        return Webiny.dispatch('before-webpack', {app: appConfig}).then(() => {
            return this.buildConfig(appConfig);
        });
    }

    buildConfig(config, statsConfig = {colors: true}) {
        return new Promise((resolve, reject) => {
            webpack(config).run(function (err, stats) {
                if (err) reject(err);

                if (statsConfig) {
                    console.log(stats.toString(statsConfig));
                }
                resolve(stats);
            });
        });
    }

    getAppConfig() {
        // Create a base config which can be used without modification
        let appConfig = this.baseAppConfig();
        // Check if the app has a webpack app config defined
        const appCfgPath = path.join(Webiny.getAppRoot(), 'webpack.config.js');
        if (Webiny.fileExists(appCfgPath)) {
            // Import app config and pass the base app config for modification
            appConfig = require(appCfgPath)(appConfig);
        }

        return appConfig;
    }
}

module.exports = Build;
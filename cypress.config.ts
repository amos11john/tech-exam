import { defineConfig } from "cypress";
import { Env } from "@typings/env";

import path = require("path");
import fs = require("fs-extra");

export default defineConfig({
  e2e: {
    watchForFileChanges: false,
    chromeWebSecurity: false,
    viewportWidth: 1680,
    viewportHeight: 1050,
    hideXHR: true,
    video: false,
    defaultCommandTimeout: 10000,
    setupNodeEvents(on, config) {
      on("before:browser:launch", (browser, launchOptions) => {
        if (
          (browser.name === "chrome" || browser.name === "edge") &&
          browser.isHeadless
        ) {
          launchOptions.args.push("--disable-gpu");
          return launchOptions;
        }
      });

      const getConfigurationByFile = (file: Env) => {
        console.log(`Env. set to ${file}`);
        const pathToConfigFile = path.resolve("cypress/config", `${file}.json`);
        return fs.readJsonSync(pathToConfigFile);
      };

      // default config is for Prod environment
      const file = config.env.configFile || "prod";
      return getConfigurationByFile(file);
    },
  },
});

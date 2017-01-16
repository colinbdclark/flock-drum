"use strict";

var fluid = require("infusion"),
    flock = fluid.registerNamespace("flock");

require("infusion-electron");

fluid.defaults("flock.drum.electron.app", {
    gradeNames: "electron.app",

    components: {
        mainWindow: {
            createOnEvent: "onReady",
            type: "flock.drum.electron.window"
        }
    }
});

fluid.defaults("flock.drum.electron.window", {
    gradeNames: "electron.unthrottledWindow",

    windowOptions: {
        title: "Flock Drum",
        x: 0,
        y: 0,
        webPreferences: {
            nodeIntegration: false
        }
    },

    model: {
        dimensions: {
            width: 640,
            height: 480
        },

        url: {
            expander: {
                funcName: "fluid.stringTemplate",
                args: ["%url/index-minimal.html", "{app}.env.appRoot"]
            }
        }
    }
});

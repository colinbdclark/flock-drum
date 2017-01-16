"use strict";

var flock = fluid.registerNamespace("flock");

fluid.defaults("flock.drum.app.node", {
    gradeNames: "flock.drum.app",

    components: {
        bankManager: {
            options: {
                bankPathRootTemplate: __dirname + "/../" + "sound-banks/%activeBankID/"
            }
        }
    }
})

"use strict";

var flock = fluid.registerNamespace("flock");

fluid.defaults("flock.drum.bankList", {
    gradeNames: "fluid.component",

    banks: [
        "mr10-samples",
        "carbon-monoxide-music-drum-kit",
        "fugwhump-analog-kit-lite",
        "sequential-circuits-drumtraks"
    ]
});

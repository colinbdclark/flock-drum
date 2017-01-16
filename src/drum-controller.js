"use strict";

var flock = fluid.registerNamespace("flock");

fluid.defaults("flock.drum.controller", {
    gradeNames: "flock.midi.device",

    numVoices: 16,

    notes: {
        expander: {
            funcName: "flock.generateSequence",
            args: [{
                start: 36,
                numValues: "{that}.options.numVoices"
            }]
        }
    },

    controls: []
});

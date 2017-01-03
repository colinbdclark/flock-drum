"use strict";

fluid.defaults("flock.drum.controller", {
    gradeNames: "flock.midi.device",

    notes: {
        expander: {
            funcName: "flock.generateSequence",
            args: [{
                start: 36,
                numValues: 16
            }]
        }
    },

    controls: []
});

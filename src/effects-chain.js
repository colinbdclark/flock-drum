"use strict";

fluid.defaults("flock.drum.effectsChain", {
    gradeNames: "fluid.component",

    components: {
        reverb: {
            type: "flock.drum.reverb",
            options: {
                ugenDef: {
                    source: "{distortion}.options.ugenDef"
                }
            }
        },

        distortion: {
            type: "flock.drum.distortion",
            options: {
                ugenDef: {
                    source: "{lowPassFilter}.options.ugenDef"
                }
            }
        },

        lowPassFilter: {
            type: "fluid.notImplemented"
        }
    }
});

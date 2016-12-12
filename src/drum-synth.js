"use strict";

fluid.defaults("flock.drum.synth", {
    gradeNames: ["flock.synth", "flock.drum.effectsChain"],

    bus: 0,
    bufferId: "0",

    components: {
        // TODO: Add a stereo panner here.
        output: {
            type: "flock.drum.out",
            options: {
                ugenDef: {
                    bus: "{synth}.options.bus",
                    sources: [
                        "{reverb}.options.ugenDef"
                    ]
                }
            }
        },

        lowPassFilter: {
            type: "flock.drum.lowPassFilter",
            options: {
                ugenDef: {
                    source: "{samplePlayer}.options.ugenDef"
                }
            }
        },

        samplePlayer: {
            type: "flock.drum.samplePlayer",
            options: {
                ugenDef: {
                    buffer: {
                        id: "{synth}.options.bufferId"
                    }
                }
            }
        }
    },

    synthDef: "{output}.options.ugenDef"
});

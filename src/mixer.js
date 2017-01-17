"use strict";

var flock = fluid.registerNamespace("flock");

fluid.defaults("flock.drum.stereoMixer", {
    gradeNames: "flock.band",

    components: {
        left: {
            type: "flock.drum.channelMixer",
            options: {
                addToEnvironment: "{kit}.options.numVoices",
                channelSourceBuses: "{kit}.options.voiceBuses.left"
            }
        },

        right: {
            type: "flock.drum.channelMixer",
            options: {
                addToEnvironment: {
                    expander: {
                        funcName: "flock.drum.stereoMixer.rightMixerNodePosition",
                        args: ["{kit}.options.numVoices"]
                    }
                },
                channelSourceBuses: "{kit}.options.voiceBuses.right"
            }
        }
    }
});

flock.drum.stereoMixer.rightMixerNodePosition = function (numVoices) {
    return numVoices + 1;
};

fluid.defaults("flock.drum.channelMixer", {
    gradeNames: ["flock.synth", "fluid.drum.effectsChain"],

    channelSourceBuses: [],

    channelSourceTemplate: {
        ugen: "flock.ugen.in",
        bus: 0
    },

    components: {
        reverb: {
            type: "flock.drum.reverb",
            options: {
                ugenDef: {
                    source: "{lowPassFilter}.options.ugenDef",
                    mul: {
                        id: "amp",
                        ugen: "flock.ugen.value",
                        rate: "control",
                        value: 1.0
                    }
                }
            }
        },

        lowPassFilter: {
            type: "flock.drum.lowPassFilter",
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
                    source: "{summer}.options.ugenDef"
                }
            }
        },

        summer: {
            type: "flock.drum.channelSum"
        }
    },

    synthDef: "{reverb}.options.ugenDef"
});

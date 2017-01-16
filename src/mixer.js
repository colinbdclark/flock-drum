"use strict";

var flock = fluid.registerNamespace("flock");

fluid.defaults("flock.drum.mixer", {
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
                        funcName: "flock.drum.mixer.rightMixerNodePosition",
                        args: ["{kit}.options.numVoices"]
                    }
                },
                channelSourceBuses: "{kit}.options.voiceBuses.right"
            }
        }
    }
});

flock.drum.mixer.rightMixerNodePosition = function (numVoices) {
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
            type: "fluid.component",
            options: {
                ugenDef: {
                    id: "mixer",
                    ugen: "flock.ugen.sum",
                    rate: "audio",
                    sources: {
                        expander: {
                            funcName: "flock.drum.channelMixer.expandChannelSources",
                            args: [
                                "{channelMixer}.options.channelSourceBuses",
                                "{channelMixer}.options.channelSourceTemplate"
                            ]
                        }
                    }
                }
            }
        }
    },

    synthDef: "{reverb}.options.ugenDef"
});

flock.drum.channelMixer.expandChannelSources = function (channelSourceBuses, channelSourceTemplate) {
    return fluid.transform(channelSourceBuses, function (bus) {
        var channelSource = fluid.copy(channelSourceTemplate);
        channelSource.bus = bus;

        return channelSource;
    });
};

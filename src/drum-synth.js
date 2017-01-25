"use strict";

var flock = fluid.registerNamespace("flock");

fluid.defaults("flock.drum.synth", {
    gradeNames: ["flock.synth", "flock.drum.effectsChain", "fluid.indexedDynamicComponent"],

    dynamicIndexTarget: "{kit}",
    // The path of the collection/member at which the index is to be held
    dynamicIndexTargetPath: "voiceIndex",
    // The path in this component at which the key is to be found
    dynamicIndexKeyPath: "options.voiceName",

    bus: 0,
    bufferId: "0",

    mergePolicy: {
        "noteChanges.on": "nomerge",
        "noteChanges.off": "nomerge"
    },

    noteChanges: {
        on: {
            "samplePlayer.trigger": 1.0,
            "ampEnvelope.gate": 1.0,
            "pitchEnvelope.gate": 1.0
        },

        off: {
            "samplePlayer.trigger": 0.0,
            "ampEnvelope.gate": 0.0,
            "pitchEnvelope.gate": 0.0
        }
    },

    components: {
        output: {
            type: "fluid.mustBeOverridden",
            options: {
                ugenDef: {
                    bus: "{synth}.options.bus",
                    mul: "{ampEnvelope}.options.ugenDef"
                }
            }
        },

        ampEnvelope: {
            type: "flock.drum.ampEnvelope"
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

fluid.defaults("flock.drum.monoSynth", {
    gradeNames: "flock.drum.synth",

    components: {
        output: {
            type: "flock.drum.monoOut",
            options: {
                ugenDef: {
                    sources: "{lowPassFilter}.options.ugenDef"
                }
            }
        }
    }
});

fluid.defaults("flock.drum.minimalMonoSynth", {
        gradeNames: "flock.drum.monoSynth",

        components: {
            output: {
                options: {
                    ugenDef: {
                        sources: "{samplePlayer}.options.ugenDef"
                    }
                }
            }
        }

});

fluid.defaults("flock.drum.stereoSynth", {
    gradeNames: "flock.drum.synth",

    components: {
        output: {
            type: "flock.drum.stereoOut",
            options: {
                ugenDef: {
                    sources: "{panner}.options.ugenDef"
                }
            }
        },

        panner: {
            type: "flock.drum.panner",
            options: {
                ugenDef: {
                    source: "{lowPassFilter}.options.ugenDef"
                }
            }
        }
    }
})

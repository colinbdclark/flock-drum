"use strict";

fluid.defaults("flock.drum.synth", {
    gradeNames: ["flock.synth", "flock.drum.effectsChain"],

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
            type: "flock.drum.out",
            options: {
                ugenDef: {
                    bus: "{synth}.options.bus",
                    sources: {
                        id: "panner",
                        ugen: "flock.ugen.pan2",
                        pan: 0,
                        source: "{reverb}.options.ugenDef"
                    }
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

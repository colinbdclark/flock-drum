"use strict";

var flock = fluid.registerNamespace("flock");

fluid.defaults("flock.drum.app", {
    gradeNames: "fluid.component",

    numChannels: 2,
    numInputBuses: 1,
    numVoices: 10,

    components: {
        enviro: {
            type: "flock.enviro",
            options: {
                components: {
                    audioSystem: {
                        options: {
                            model: {
                                blockSize: 128,
                                bufferSize: 1024,
                                chans: "{app}.options.numChannels",
                                numInputBuses:  "{app}.options.numInputBuses",
                                numBuses: "@expand:flock.drum.app.calcNumBuses({app}.options)"
                            }
                        }
                    }
                }
            }
        },

        kit: {
            type: "flock.drum.kit",
            options: {
                numVoices: "{app}.options.numVoices",

                components: {
                    enviro: "{app}.enviro"
                }
            }
        },

        mixer: {
            type: "flock.drum.stereoMixer"
        },

        bankManager: {
            type: "flock.drum.bankManager"
        },

        midiSource: {
            type: "flock.drum.midiSource",
            options: {
                numVoices: "{app}.options.numVoices"
            }
        }
    },

    listeners: {
        "onCreate.startPlaying": [
            "{enviro}.start()",
            "{kit}.play()",
            "{mixer}.play()"
        ]
    }
});

flock.drum.app.calcNumBuses = function (o) {
    return o.numChannels + o.numInputBuses + (o.numVoices * o.numChannels);
};

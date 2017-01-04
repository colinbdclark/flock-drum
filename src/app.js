"use strict";

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
                },

                events: {
                    // Any other arrangement of event distribution will fail silently.
                    // Presumably, observing the {controlPanel} here ensures it is created in
                    // time for the voices to be instantiated.
                    onVoiceCreated: "{controlPanel}.events.onVoiceCreated"
                }
            }
        },

        controlPanel: {
            type: "flock.drum.controlPanel",
            container: "#note-trigger-panel"
        },

        mixer: {
            type: "flock.drum.mixer"
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

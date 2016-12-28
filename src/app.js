"use strict";

fluid.defaults("flock.drum.app", {
    gradeNames: "fluid.component",

    components: {
        enviro: {
            type: "flock.enviro",
            options: {
                components: {
                    audioSystem: {
                        options: {
                            model: {
                                numBuses: 36
                            }
                        }
                    }
                }
            }
        },

        kit: {
            type: "flock.drum.kit",
            options: {
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

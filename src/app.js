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
                }
            }
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

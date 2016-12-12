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

        bankManager: {
            type: "flock.drum.bankManager"
        }
    },

    listeners: {
        "onCreate.loadFirstBank": {
            func: "{bankManager}.loadBank",
            args: ["{bankManager}.bankList.options.banks.0"]
        },

        "onCreate.startPlaying": [
            "{enviro}.start()",
            "{kit}.play()",
            "{kit}.mixer.play()" // TODO: Upstream -Bands should distribute to child bands.
        ]
    }
});
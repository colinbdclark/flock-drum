"use strict";

fluid.defaults("flock.drum.app.minimal", {
    gradeNames: "flock.drum.app",

    numVoices: 6,

    components: {
        kit: {
            options: {
                dynamicComponents: {
                    voice: {
                        type: "flock.drum.minimalMonoSynth",
                    }
                }
            }
        },

        mixer: {
            type: "flock.drum.channelMixer",
            options: {
                addToEnvironment: "{kit}.options.numVoices",
                channelSourceBuses: "{kit}.options.voiceBuses.left"
            }
        }
    }
});

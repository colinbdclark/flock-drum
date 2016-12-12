"use strict";

fluid.defaults("flock.drum.kit", {
    gradeNames: "flock.band",

    numVoices: 16,

    voiceBuses: {
        expander: {
            funcName: "flock.drum.kit.expandVoiceBuses",
            args: ["{that}.options.numVoices", "{that}.enviro"]
        }
    },

    voiceOptionsTemplate: {
        bus: 0,
        bufferId: "0"
    },

    voiceOptions: {
        expander: {
            funcName: "flock.drum.kit.expandVoiceOptions",
            args: [
                "{that}.options.voiceBuses",
                "{that}.options.voiceOptionsTemplate"
            ]
        }
    },

    components: {
        mixer: {
            type: "flock.drum.mixer"
        }
    },

    dynamicComponents: {
        voice: {
            sources: "{that}.options.voiceOptions",
            type: "flock.drum.synth",
            options: {
                addToEnvironment: "{sourcePath}",
                bus: "{source}.bus",
                bufferId: "{source}.bufferId",
                components: {
                    enviro: "{enviro}"
                }
            }
        }
    }
});

flock.drum.kit.expandVoiceBuses = function (numVoices, enviro) {
    var left = [],
        right = [];

    for (var i = 0; i < numVoices; i++) {
        left[i] = enviro.busManager.acquireNextBus("interconnect");
        right[i] = enviro.busManager.acquireNextBus("interconnect");
    }

    return {
        left: left,
        right: right
    };
};

flock.drum.kit.expandVoiceOptions = function (voiceBuses, voiceOptionsTemplate) {
    return fluid.transform(voiceBuses.left, function (voiceBus, idx) {
        var optionsForVoice = fluid.copy(voiceOptionsTemplate);
        optionsForVoice.bus = voiceBus;
        optionsForVoice.bufferId = String(idx);

        return optionsForVoice;
    });
};
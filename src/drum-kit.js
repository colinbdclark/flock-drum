"use strict";

fluid.defaults("flock.drum.kit", {
    gradeNames: "flock.band",

    numVoices: 16,

    members: {
        voiceIndex: {}
    },

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

    dynamicComponents: {
        voice: {
            sources: "{that}.options.voiceOptions",
            type: "flock.drum.synth",
            options: {
                voiceName: "{sourcePath}",
                addToEnvironment: "{sourcePath}",
                bus: "{source}.bus",
                bufferId: "{source}.bufferId",
                components: {
                    enviro: "{enviro}"
                },
                listeners: {
                    "onCreate.fireKitVoiceCreation": {
                        funcName: "{kit}.events.onVoiceCreated.fire",
                        args: ["{that}"]
                    }
                }
            }
        }
    },

    invokers: {
        voiceForName: "flock.drum.kit.voiceForName({arguments}.0, {that})"
    },

    events: {
        onVoiceCreated: null
    }
});

flock.drum.kit.voiceForName = function (name, that) {
    var voiceMemberName = that.voiceIndex[name];
    return that[voiceMemberName];
};

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
    // TODO: Hardcoded to the left channel only.
    return fluid.transform(voiceBuses.left, function (voiceBus, idx) {
        var optionsForVoice = fluid.copy(voiceOptionsTemplate);
        optionsForVoice.bus = voiceBus;
        optionsForVoice.bufferId = String(idx);

        return optionsForVoice;
    });
};

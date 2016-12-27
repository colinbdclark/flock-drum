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
                },
                events: {
                    onCreate: "{kit}.events.onVoiceCreated"
                }
            }
        },

        // TODO: This should be defined in a parent component
        // representing the panel of trigger buttons.
        triggerButton: {
            createOnEvent: "onVoiceCreated",
            type: "flock.ui.noteGateButton",
            container: "#note-trigger-panel",
            options: {
                gateTimer: 0.5,

                cat: "{arguments}.0", // TODO: Infusion will not allow me to refer to this
                                      // at options.components.target
                components: {
                    target: "{that}.options.cat"
                }
            }
        }
    },

    events: {
        onVoiceCreated: null
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

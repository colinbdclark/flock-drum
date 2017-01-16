"use strict";

var flock = fluid.registerNamespace("flock");

fluid.defaults("flock.drum.web.triggerButton", {
    gradeNames: "flock.ui.noteGateButton",

    gateTimer: 0.25,

    noteOnChange: {
        "ampEnvelope.sustain": 1.0
    },

    listeners: {
        "onOpen.noteOn": {
            funcName: "{that}.target.noteOn",
            args: ["{that}.options.noteOnChange"]
        },

        "onClose.noteOff": "{that}.target.noteOff()"
    }
});

fluid.defaults("flock.drum.web.controlPanel", {
    gradeNames: "fluid.viewComponent",

    dynamicComponents: {
        triggerButton: {
            createOnEvent: "onVoiceCreated",
            type: "flock.drum.web.triggerButton",
            container: "{controlPanel}.container",
            options: {
                targetVoiceName: "{arguments}.0.options.voiceName",
                components: {
                    target: "@expand:{app}.kit.voiceForName({that}.options.targetVoiceName)"
                }
            }
        }
    },

    events: {
        onVoiceCreated: null
    }
});

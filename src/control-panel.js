"use strict";

fluid.defaults("flock.drum.controlPanel", {
    gradeNames: "fluid.viewComponent",

    dynamicComponents: {
        triggerButton: {
            createOnEvent: "onVoiceCreated",
            type: "flock.ui.noteGateButton",
            container: "{controlPanel}.container",
            options: {
                gateTimer: 0.25,
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

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
    },
});

"use strict";

var flock = fluid.registerNamespace("flock");

fluid.defaults("flock.drum.web.app", {
    gradeNames: "flock.drum.app",

    components: {
        controlPanel: {
            type: "flock.drum.web.controlPanel",
            container: "#note-trigger-panel"
        },

        kit: {
            options: {
                events: {
                    // Any other arrangement of event distribution will fail silently.
                    // Presumably, observing the {controlPanel} here ensures it is created in
                    // time for the voices to be instantiated.
                    onVoiceCreated: "{controlPanel}.events.onVoiceCreated"
                }
            }
        }
    }
});

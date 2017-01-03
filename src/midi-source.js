"use strict";

fluid.defaults("flock.drum.midiSource", {
    gradeNames: "fluid.modelComponent",

    // TODO: Somehow these midi note numbers
    // need to get mapped into model listeners on {controller}
    // which will fire the appropriate voice's noteOn/noteOff events.
    model: {
        voiceMIDINotes: {
            expander: {
                funcName: "flock.generateSequence",
                args: [{
                    start: 36,
                    numValues: 16
                }]
            }
        }
    },

    components: {
        controller: {
            type: "flock.drum.controller",
            options: {
                modelListeners: {
                    "notes.*": {
                        "this": "console",
                        method: "log",
                        args: ["{change}.path", "{change}.value"]
                    }
                }
            }
        }
    }
});

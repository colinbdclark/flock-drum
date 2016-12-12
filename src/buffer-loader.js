"use strict";

fluid.defaults("flock.drum.bankLoader", {
    gradeNames: "flock.bufferLoader",
    
    bufferDefs: {
        expander: {
            funcName: "flock.drum.bankManager.makeBufferDefs",
            args: ["{bankManager}.model.activeBank"]
        }
    },

    events: {
        afterBuffersLoaded: "{bankManager}.events.afterBankLoaded"
    }
})

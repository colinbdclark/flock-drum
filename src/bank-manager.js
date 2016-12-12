"use strict";

fluid.defaults("flock.drum.bankManager", {
    gradeNames: "fluid.modelComponent",

    model: {
        activeBank: {}
    },

    modelListeners: {
        activeBank: {
            excludeSource: "init",
            func: "{that}.events.onLoadBankBuffers.fire",
            args: ["{change}.value"]
        }
    },

    components: {
        bankList: {
            type: "flock.drum.bankList"
        },

        bufferLoader: {
            type: "flock.bufferLoader",
            createOnEvent: "onLoadBankBuffers",
            options: {
                bufferDefs: {
                    expander: {
                        funcName: "flock.drum.bankManager.makeBufferDefs",
                        args: ["{bankManager}.model.activeBank"]
                    }
                },

                events: {
                    afterBuffersLoaded: "{bankManager}.events.afterBankLoaded"
                }
            }
        }
    },

    invokers: {
        loadBank: "flock.drum.bankManager.loadBank({arguments}.0, {that})"
    },

    events: {
        afterBankMetadataLoaded: null,
        afterBankLoaded: null,
        onBankLoadError: null,
        onLoadBankBuffers: null
    },

    listeners: {
        "afterBankMetadataLoaded.deletePreviousBank": {
            changePath: "activeBank",
            value: null,
            type: "DELETE"
        },

        "afterBankMetadataLoaded.updateActiveBank": {
            priority: "after:deletePreviousBank",
            changePath: "activeBank",
            value: "{arguments}.0"
        },

        "onBankLoadError.logError": {
            "this": "console",
            method: "log",
            args: ["{arguments}.0"]
        }
    }
});

flock.drum.bankManager.pathForBankName = function (bankName) {
    return "sound-banks/" + bankName + "/bank.json";
};

// TODO: Replace this with something suitable for use both in Electron and a browser.
flock.drum.bankManager.loadBank = function (bankName, that) {
    var path = flock.drum.bankManager.pathForBankName(bankName);

    $.ajax({
        url: path,
        method: "GET",
        dataType: "json",
        success: that.events.afterBankMetadataLoaded.fire,
        error: function (jqXHR, textStatus, errorThrown) {
            that.events.onBankLoadError.fire(errorThrown);
        }
    });
};

flock.drum.bankManager.makeBufferDefs = function (bank) {
    if (!bank) {
        return [
            {
                id: "FIX ME" // TODO: Look left!
            }
        ];
    }

    return fluid.transform(bank.voices, function (voice, idx) {
        return {
            // TODO: This correspondence is too lose; it should at least be
            // factored out into a utility function.
            id: String(idx),
            // TODO: Remove hard coding.
            src: "sound-banks/carbon-monoxide-music-drum-kit/" + voice.file
        };
    });
};

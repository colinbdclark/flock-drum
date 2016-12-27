"use strict";

fluid.defaults("flock.drum.bankManager", {
    gradeNames: "fluid.modelComponent",

    bankPathRootTemplate: "sound-banks/%activeBankID/",

    model: {
        activeBankID: "{that}.bankList.options.banks.0",
        activeBankPathRoot: "",
        activeBank: {}
    },

    modelRelay: [
        {
            target: "activeBank",
            singleTransform: {
                type: "fluid.transforms.free",
                func: "flock.drum.bankManager.loadBank",
                args: ["{that}.model", "{that}.events"]
            }
        },
        {
            target: "activeBankPathRoot",
            singleTransform: {
                type: "fluid.transforms.stringTemplate",
                template: "{that}.options.bankPathRootTemplate",
                terms: "{that}.model"
            }
        }
    ],

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
                        args: ["{bankManager}.model"]
                    }
                },

                events: {
                    afterBuffersLoaded: "{bankManager}.events.afterBankLoaded"
                }
            }
        }
    },

    invokers: {
        loadBank: {
            changePath: "activeBankID",
            value: "{arguments}.0"
        }
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
            args: [
                "An error occurred while loading the",
                "{that}.model.activeBankID",
                "sound bank from path",
                "{that}.model.activeBankPathRoot",
                "Error was:",
                "{arguments}.0",
                "\n",
                "activeBank model is:",
                "{that}.model.activeBank"
            ]
        }
    }
});

// TODO: Replace this with something suitable for use both in Electron and a browser.
flock.drum.bankManager.loadBank = function (model, events) {
    if (!model || !model.activeBankPathRoot) {
        return;
    }

    var path = model.activeBankPathRoot + "bank.json";

    $.ajax({
        url: path,
        method: "GET",
        dataType: "json",
        success: events.afterBankMetadataLoaded.fire,
        error: function (jqXHR, textStatus, errorThrown) {
            events.onBankLoadError.fire(errorThrown);
        }
    });
};

flock.drum.bankManager.makeBufferDefs = function (model) {
    if (!model.activeBank) {
        return [
            {
                id: "Flocking Errors out if you try to load a bufDef without an id or src property" // TODO: Look left!
            }
        ];
    }

    return fluid.transform(model.activeBank.voices, function (voice, idx) {
        return {
            // TODO: This correspondence is too lose; it should at least be
            // factored out into a utility function.
            id: String(idx),
            src: model.activeBankPathRoot + voice.file
        };
    });
};

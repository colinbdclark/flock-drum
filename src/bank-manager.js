"use strict";

var flock = fluid.registerNamespace("flock"),
    jQuery = fluid.registerNamespace("jQuery");

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
            target: "activeBankPathRoot",
            singleTransform: {
                type: "fluid.transforms.stringTemplate",
                template: "{that}.options.bankPathRootTemplate",
                terms: {
                    activeBankID: "{that}.model.activeBankID"
                }
            }
        }
    ],

    modelListeners: {
        activeBankID: {
            func: "flock.drum.bankManager.loadBank",
            args: ["{that}.model", "{that}.events"]
        },

        activeBank: {
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

flock.drum.bankManager.loadBank = function (model, events) {
    if (!model || !model.activeBankPathRoot) {
        return {};
    }

    var path = model.activeBankPathRoot + "bank.json";

    flock.drum.bankManager.loadJSON({
        url: path,
        success: events.afterBankMetadataLoaded.fire,
        error: function (jqXHR, textStatus, errorThrown) {
            events.onBankLoadError.fire(errorThrown);
        }
    });
};

flock.drum.bankManager.loadJSON = function (options) {
    var strategy = (typeof jQuery !== undefined && jQuery.ajax) ?
        flock.drum.bankManager.loadJSON.ajax : flock.drum.bankManager.loadJSON.require;

    strategy(options);
};

flock.drum.bankManager.loadJSON.ajax = function (options) {
    $.ajax({
        url: options.url,
        method: "GET",
        dataType: "json",
        success: options.success,
        error: options.error
    });
};

flock.drum.bankManager.loadJSON.require = function (options) {
    // TODO: This asynchrony is required only because of a bug in the
    // model relay for this component. Fix it!
    process.nextTick(function () {
        try {
            var json = require(options.url);
            options.success(json);
        } catch (e) {
            options.error(undefined, e.message, e);
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

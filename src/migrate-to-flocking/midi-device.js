/*
 * Flocking MIDI Device
 * Copyright 2016, Colin Clark
 *
 * Dual licensed under the MIT and GPL Version 2 licenses.
 */

/*global require*/

var fluid = fluid || require("infusion"),
    flock = fluid.registerNamespace("flock");

(function () {
    "use strict";

    flock.generateSequence = function (spec, arr) {
        arr = arr || [];

        if (!spec || (!spec.end && !spec.numValues)) {
            return arr;
        }

        var start = spec.start || 0,
            step = spec.step || 1,
            end = spec.end !== undefined ? spec.end : start + (spec.numValues * step);

        for (var val = start, i = 0; val < end + 1; val += step, i++) {
            arr[i] = val;
        }

        return arr;
    };

    fluid.defaults("flock.midi.deviceConnection", {
        gradeNames: "flock.midi.connection",

        ports: "{device}.options.ports",
        openImmediately: "{device}.options.openImmediately",

        // TODO: This is a familiar issue!
        events: {
            raw: "{device}.events.raw",
            message: "{device}.events.message",
            note: "{device}.events.note",
            noteOn: "{device}.events.noteOn",
            noteOff: "{device}.events.noteOff",
            control: "{device}.events.control",
            program: "{device}.events.program",
            aftertouch: "{device}.events.aftertouch",
            pitchbend: "{device}.events.pitchbend"
        }
    });

    fluid.defaults("flock.midi.device", {
        gradeNames: ["fluid.modelComponent", "flock.midi.receiver"],

        mergePolicy: {
            notes: "nomerge",
            controls: "nomerge"
        },

        notes: {
            expander: {
                funcName: "flock.generateSequence",
                args: [{
                    start: 0,
                    end: 127,
                    step: 1
                }]
            }
        },

        controls: {
            expander: {
                funcName: "flock.generateSequence",
                args: [{
                    start: 0,
                    end: 127,
                    step: 1
                }]
            }
        },

        initialNoteValue: {
            active: false,
            velocity: 0
        },

        initialControlValue: 0,

        ports: {
            input: "*"
        },

        openImmediately: true,

        model: {
            notes: {
                expander: {
                    funcName: "flock.midi.device.initializeModelRegion",
                    args: ["{that}.options.notes", "{that}.options.initialNoteValue"]
                }
            },

            controls: {
                expander: {
                    funcName: "flock.midi.device.initializeModelRegion",
                    args: ["{that}.options.controls", "{that}.options.initialControlValue"]
                }
            }
        },

        components: {
            connection: {
                type: "flock.midi.deviceConnection"
            }
        },

        listeners: {
            "noteOn.updateNoteModel": {
                func: "{that}.applier.change",
                args: [
                    ["notes", "{arguments}.0.note"],
                    {
                        active: true,
                        velocity: "{arguments}.0.velocity"
                    }
                ]
            },

            "noteOff.updateNoteModel": {
                func: "{that}.applier.change",
                args: [
                    ["notes", "{arguments}.0.note"],
                    {
                        active: false,
                        velocity: "{arguments}.0.velocity"
                    }
                ]
            },

            "control.updateValue": {
                func: "{that}.applier.change",
                args: [
                    ["controls", "{arguments}.0.note"],
                    {
                        active: false,
                        value: "{arguments}.0.value"
                    }
                ]
            }
        }
    });

    flock.midi.device.initializeModelRegion = function (sequence, initialValue) {
        var modelRegion = {};
        fluid.each(sequence, function (num) {
            modelRegion[num] = fluid.copy(initialValue);
        });
        return modelRegion;
    };
}());

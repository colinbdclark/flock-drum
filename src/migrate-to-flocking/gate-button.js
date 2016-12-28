/*
 * Flocking UI Gate Button
 * Copyright 2016, Colin Clark
 *
 * Dual licensed under the MIT and GPL Version 2 licenses.
 */

/*global require*/

var fluid = fluid || require("infusion"),
    flock = fluid.registerNamespace("flock");

(function () {
    "use strict";

    var $ = fluid.registerNamespace("jQuery");

    fluid.defaults("flock.ui.gateButton", {
        gradeNames: "flock.ui.selfRenderingView",

        // If the gateTimer is set to > 0.0, the button will automatically
        // fire a gate close event after the specified time.
        // Otherwise, the gate will open on click and close on release.
        gateTimer: 0.0,

        closeOnRelease: true,

        model: {
            activeTimer: null
        },

        modelListeners: {
            "activeTimer": {
                funcName: "flock.ui.gateButton.clearOldGateTimer",
                args: ["{change}"]
            }
        },

        events: {
            onOpen: null,
            onClose: null,
            afterRendered: null
        },

        listeners: {
            // TODO: This isn't quite enough. In most cases,
            // if we haven't reset/closed the trigger between clicks (e.g. fast clicking),
            // nothing will happen. This means we need:
            //   a) to keep track of whether we're currently open or not
            //   b) if we're open, close the gate immediately and register
            //      the re-opening for the next tick.
            "afterRendered.registerOpenHandler": {
                "this": "{that}.dom.element",
                method: "mousedown",
                args: ["{that}.events.onOpen.fire"]
            },

            "afterRendered.registerCloseHandler": {
                funcName: "flock.ui.gateButton.registerCloseHandler",
                args: ["{that}"]
            },

            "onOpen.styleOn": {
                "this": "{that}.dom.element",
                method: "addClass",
                args: ["{that}.options.styles.on"]
            },

            "onOpen.setCloseTimer": {
                funcName: "flock.ui.gateButton.setCloseTimer",
                args: ["{that}"]
            },

            "onClose.resetActiveTimerID": {
                changePath: "activeTimerID",
                type: "DELETE"
            },

            "onClose.styleOff": {
                "this": "{that}.dom.element",
                method: "removeClass",
                args: ["{that}.options.styles.on"]
            }
        },

        markup: {
            element: "<button class='flock-gateButton'>%label</button>"
        },

        strings: {
            label: "Trigger"
        },

        styles: {
            active: "flock-gateButton-active",  // Clicked
            on: "flock-gateButton-on"           // On (gate timer may be running)
        }
    });

    flock.ui.gateButton.registerCloseHandler = function (that) {
        // We only fire close events if there's no gateTimer set and
        // the user wants explict close events to be fired.
        if (that.options.closeOnRelease && that.options.gateTimer <= 0.0) {
            that.locate("element").mouseup(that.events.onClose.fire);
        }
    };

    flock.ui.gateButton.setCloseTimer = function (that) {
        var durationMS = that.options.gateTimer * 1000;
        var timerID = setTimeout(that.events.onClose.fire, durationMS);

        that.applier.change("activeTimerID", timerID);
    };

    flock.ui.gateButton.clearOldGateTimer = function (newTimerID, oldTimerID) {
        if (oldTimerID && newTimerID !== oldTimerID) {
            clearTimeout(oldTimerID);
        }
    };
}());

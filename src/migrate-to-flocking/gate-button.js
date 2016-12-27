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
        gradeNames: "fluid.viewComponent",

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
            "onCreate.render": {
                funcName: "flock.ui.gateButton.render",
                args: ["{that}"]
            },

            "afterRendered.registerOpenHandler": {
                "this": "{that}.dom.button",
                method: "mousedown",
                args: ["{that}.events.onOpen.fire"]
            },

            "afterRendered.registerCloseHandler": {
                funcName: "flock.ui.gateButton.registerCloseHandler",
                args: ["{that}"]
            },

            "onOpen.styleOn": {
                "this": "{that}.dom.button",
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
                "this": "{that}.dom.button",
                method: "removeClass",
                args: ["{that}.options.styles.on"]
            }
        },

        markup: {
            button: "<button class='flock-gateButton'>%label</button>"
        },

        strings: {
            label: "Trigger"
        },

        styles: {
            active: "flock-gateButton-active",  // Clicked
            on: "flock-gateButton-on"           // On (gate timer may be running)
        },

        selectors: {
            button: "button"
        }
    });

    flock.ui.gateButton.render = function (that) {
        var renderedMarkup = fluid.stringTemplate(that.options.markup.button,
            that.options.strings);

        var el = $(renderedMarkup);
        that.container.append(el);
        that.events.afterRendered.fire(el);
    };

    flock.ui.gateButton.registerCloseHandler = function (that) {
        // We only fire close events if there's no gateTimer set and
        // the user wants explict close events to be fired.
        if (that.options.closeOnRelease && that.options.gateTimer <= 0.0) {
            that.locate("button").mouseup(that.events.onClose.fire);
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

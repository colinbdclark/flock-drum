/*
 * Flocking UI Note Gate Button
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

    fluid.defaults("flock.ui.noteGateButton", {
        gradeNames: "flock.ui.gateButton",

        component: {
            target: "fluid.mustBeOverridden"
        },

        listeners: {
            "onOpen.noteOn": "{that}.target.noteOn()",
            "onClose.noteOff": "{that}.target.noteOff()"
        }
    });
}());

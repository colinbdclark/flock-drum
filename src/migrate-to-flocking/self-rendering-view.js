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

    fluid.defaults("flock.ui.selfRenderingView", {
        gradeNames: "fluid.viewComponent",

        idPrefix: "flock-ui-",

        elementID: "@expand:flock.ui.selfRenderingView.allocateID({that}.options.idPrefix)",

        invokers: {
            // TODO: Add support for re-rendering.
            render: {
                funcName: "flock.ui.selfRenderingView.render",
                args: ["{that}"]
            }
        },

        listeners: {
            "onCreate.render": "{that}.render()"
        },

        selectors: {
            element: {
                expander: {
                    funcName: "flock.ui.selfRenderingView.generateIDSelector",
                    args: ["{that}.options.elementID"]
                }
            }
        }
    });

    flock.ui.selfRenderingView.allocateID = function (idPrefix) {
        return idPrefix + fluid.allocateGuid();
    };

    flock.ui.selfRenderingView.generateIDSelector = function (elementID) {
        return "#" + elementID;
    };

    flock.ui.selfRenderingView.render = function (that) {
        var renderedMarkup = fluid.stringTemplate(that.options.markup.element,
            that.options.strings);

        var el = $(renderedMarkup);
        el.attr("id", that.options.elementID);
        that.container.append(el);
        that.events.afterRendered.fire(el);
    };
}());

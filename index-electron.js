"use strict";

var fluid = require("infusion");

require("./src/require-components.js")
require("./src/electron-app.js");

var flock = fluid.registerNamespace("flock");

var electronApp = flock.drum.electron.app();

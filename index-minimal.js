"use strict";

var fluid = require("infusion"),
    flock = require("flocking");

require("./src/require-components.js")
require("./minimal-app.js");

var drumApp = flock.drum.app.node({
    gradeNames: ["flock.drum.app.minimal"]
});

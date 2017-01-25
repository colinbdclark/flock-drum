"use strict";

var fluid = require("infusion"),
    flock = require("flocking");

require("./migrate/to-infusion/DynamicComponentIndexer.js");
require("./migrate/to-flocking/self-rendering-view.js");
require("./migrate/to-flocking/gate-button.js");
require("./migrate/to-flocking/note-gate-button.js");
require("./migrate/to-flocking/midi-device.js");

require("./ugen-defs.js");
require("./drum-synth.js");
require("./mixer.js");
require("./drum-kit.js");
require("./control-panel.js");
require("./bank-list.js");
require("./bank-manager.js");
require("./midi-source.js");
require("./app.js");
require("./node-app.js");

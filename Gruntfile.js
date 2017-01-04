/*
 * Flock Drum Gruntfile
 * http://github.com/colinbdclark/flock-drum
 *
 * Copyright 2016, Colin Clark
 * Licensed under the MIT license.
 */
"use strict";

module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON("package.json"),

        eslint: {
            all: [
                "src/**/*.js",
                "tests/**/*js",
                "!node_modules/**",
                "!src/migrate/**/*.js"
            ]
        },
        jsonlint: {
            all: [
                "src/**/*.json",
                "sound-banks/**/*.json",
                "tests/**/*.json"
            ]
        },
    });

    grunt.loadNpmTasks("fluid-grunt-eslint");
    grunt.loadNpmTasks("grunt-jsonlint");

    grunt.registerTask("lint", "Apply eslint and jsonlint", ["eslint", "jsonlint"]);
    grunt.registerTask("default", ["lint"]);
};

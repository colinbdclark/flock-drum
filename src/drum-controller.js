"use strict";

fluid.defaults("flock.drum.controller", {
    gradeNames: "flock.midi.controller",

    ports: "*",

    components: {
        synthContext: "{kit}",

        connection: {
            options: {
                ports: {
                    input: "{controller}.options.ports"
                }
            }
        }
    },

    noteMap: {}
});

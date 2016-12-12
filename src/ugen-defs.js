"use strict";

fluid.defaults("flock.drum.out", {
    gradeNames: "fluid.component",

    ugenDef: {
        id: "voiceOutput",
        ugen: "flock.ugen.out",
        bus: 0,
        expand: 2
    }
});


fluid.defaults("flock.drum.gain", {
    gradeNames: "fluid.component",

    ugenDef: {
        id: "gain",
        ugen: "flock.ugen.passThrough",
        rate: "audio",

        mul: {
            id: "amp",
            ugen: "flock.ugen.value",
            rate: "control",
            value: 1.0
        }
    }
});


fluid.defaults("flock.drum.reverb", {
    gradeNames: "fluid.component",

    ugenDef: {
        id: "reverb",
        ugen: "flock.ugen.freeverb",
        rate: "audio",
        mix: 0.0,
        room: 0.5,
        damp: 0.5
    }
});

fluid.defaults("flock.drum.distortion", {
    gradeNames: "fluid.component",

    ugenDef: {
        id: "distortion",
        ugen: "flock.ugen.distortion",
        rate: "audio",
        gain: 1.0
    }
});

fluid.defaults("flock.drum.lowPassFilter", {
    gradeNames: "fluid.component",

    ugenDef: {
        id: "lowPassFilter",
        ugen: "flock.ugen.filter.biquad.rlp",
        rate: "audio",

        cutoff: {
            ugen: "flock.ugen.value",
            rate: "control",
            value: 10000
        },

        q: 1.0
    }
});

fluid.defaults("flock.drum.samplePlayer", {
    gradeNames: "fluid.component",

    ugenDef: {
        id: "samplePlayer",
        ugen: "flock.ugen.playBuffer",
        rate: "audio",
        buffer: {
            id: ""
        },

        trigger: 0.0,
        loop: 0.0,
        start: 0,
        end: 1.0,

        speed: {
            id: "pitchEnvelope",
            ugen: "flock.ugen.asr",
            rate: "audio",
            attack: 0,
            sustain: 1.0,
            release: 0,
            gate: 0
        },

        mul: {
            id: "ampEnvelope",
            ugen: "flock.ugen.asr",
            rate: "audio",
            start: 0.0,
            sustain: 1.0,
            attack: 0,
            release: 0,
            gate: 0
        }
    }
});

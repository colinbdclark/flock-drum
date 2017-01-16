"use strict";

var flock = fluid.registerNamespace("flock");

fluid.defaults("flock.drum.out", {
    gradeNames: "fluid.component",

    ugenDef: {
        id: "voiceOutput",
        ugen: "flock.ugen.out",
        rate: "audio",
        bus: 0,
        expand: 2
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
        ugen: "flock.ugen.filter.moog",
        rate: "audio",
        cutoff: 44100,
        resonance: 0
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
        }
    }
});

fluid.defaults("flock.drum.ampEnvelope", {
    gradeNames: "fluid.component",

    ugenDef: {
        id: "ampEnvelope",
        ugen: "flock.ugen.asr",
        rate: "audio",
        start: 0.0,
        sustain: 1.0,
        attack: 0,
        release: 0,
        gate: 0
    }
});

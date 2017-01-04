"use strict";

fluid.defaults("flock.drum.midiSource", {
    gradeNames: "fluid.modelComponent",

    numVoices: 16,

    model: {
        voiceMIDINotes: {
            expander: {
                funcName: "flock.generateSequence",
                args: [{
                    start: 36,
                    numValues: "{that}.options.numVoices"
                }]
            }
        }
    },

    components: {
        controller: {
            type: "flock.drum.controller",
            options: {
                numVoices: "{midiSource}.options.numVoices",
                modelListeners: {
                    "notes.*": {
                        funcName: "flock.drum.midiSource.triggerVoice",
                        args: [
                            "{change}.path.1",
                            "{change}.value",
                            "{midiSource}.model.voiceMIDINotes",
                            "{kit}"
                        ]
                    }
                }
            }
        }
    }
});

flock.drum.midiSource.triggerVoice = function (midiNoteNum, noteModel, voiceMIDINotes, kit) {
    var voiceIdx = voiceMIDINotes.indexOf(Number(midiNoteNum));
    if (voiceIdx < 0) {
        return;
    }

    var voice = kit.voiceForName(voiceIdx),
        // TODO: Would be nice for a smoother mapping between these two semantics.
        voiceFn = noteModel.active ? voice.noteOn : voice.noteOff,
        velo = noteModel.velocity;

    // TODO: Better indirection between velocity and the synth via a model relay.
    voiceFn({
        // TODO: Need to factor flock.ugen.midiAmp out into a function.
        "ampEnvelope.sustain": velo > 0 ? velo / 127 : 0
    });
};

"use strict";

var flock = fluid.registerNamespace("flock");

fluid.defaults("flock.drum.midiSource", {
    gradeNames: "fluid.modelComponent",

    numVoices: 16,

    members: {
        midiVoiceCache: []
    },

    model: {
        voiceMIDINotes: {
            expander: {
                funcName: "flock.generateSequence",
                args: [{
                    start: 36,
                    numValues: "{that}.options.numVoices"
                }]
            }
        },

        masterControlMap: {
            10: "amp.velocity",
            74: "distortion.amount.source",
            71: "lowPassFilter.cutoff.value",
            76: "lowPassFilter.resonance.source",
            77: "reverb.mix.velocity",
            93: "reverb.room.velocity",
            73: "reverb.damp.velocity"
        }
    },

    modelListeners: {
        voiceMIDINotes: {
            funcName: "flock.drum.midiSource.cacheVoices",
            args: ["{kit}", "{that}", "{change}.value"]
        }
    },

    components: {
        connection: {
            type: "flock.midi.connection",
            options: {
                ports: {
                    input: "*"
                },
                openImmediately: true,
                listeners: {
                    "note.triggerVoice": {
                        funcName: "flock.drum.midiSource.triggerVoice",
                        args: [
                            "{arguments}.0",
                            "{midiSource}"
                        ]
                    },

                    "control.updateMaster": {
                        funcName: "flock.drum.midiSource.updateMasterControl",
                        args: [
                            "{arguments}.0",
                            "{midiSource}",
                            "{mixer}"
                        ]
                    }
                }
            }
        }
    }
});

flock.drum.midiSource.cacheVoices = function (kit, that, voiceMIDINotes) {
    that.midiVoiceCache = Array(127);

    fluid.each(kit.voiceIndex, function (voiceID, voiceName) {
        var voice = kit[voiceID],
            idx = Number(voiceName),
            midiNote = voiceMIDINotes[idx];

        that.midiVoiceCache[midiNote] = voice;
    });
};

flock.drum.midiSource.triggerVoice = function (noteSpec, that) {
    var voice = that.midiVoiceCache[noteSpec.note];

    if (!voice) {
        return;
    }

    voice[noteSpec.type]({
        // TODO: Need to factor flock.ugen.midiAmp out into a function.
        "ampEnvelope.sustain": noteSpec.velocity / 127
    });
};

flock.drum.midiSource.updateMasterControl = function (controlSpec, that, mixer) {
    var path = that.model.masterControlMap[controlSpec.number];
    if (!path) {
        return;
    }

    mixer.set(path, controlSpec.value);
};

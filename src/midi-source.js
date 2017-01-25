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

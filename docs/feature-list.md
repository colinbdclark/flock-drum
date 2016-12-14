* 16 sample playback voices; each voice has:
    * sample start
    * sample end
    * midi note number
    * amplitude envelope generator
        * attack
        * sustain level
        * release
    * pitch (speed) envelope generator
        * attack
        * sustain level
        * release
    * 12db bi-quad resonant low-pass filter
        * cutoff frequency
        * q
    * reverb
        * amount (mix)
        * room
        * damp
    * distortion
        * amount
    *  panner
        * pan -1..0..1 (0..64..127)
* global effects
    * (needs implementation) resampler
        * amount
        * sampleRate
    * (needs implementation) bitcrusher
        * amount
        * bitRate
    * distortion
        * amount
    * reverb
        * amount (mix)
        * damp
        * room
* sample loader
    * JSON-based packaging scheme that is a serialization of all the above parameters:
        * voices: array(16)
        * voice:
            * sample start
            * length
            * midi note number
            * amplitude envelope
            * pitch envelope
            * filter
            * reverb
            * pan
        * global parameters
            * midi control map (paramName -> CC number)
            * effects
                * resampler
                * bitcrusher
                * distortion
                * reverb
    * (future) web app sample loader
        * provides a 16-cell matrix where samples can be loaded and mapped to MIDI numbers
    * (future) (needs implementation) support for loading Volca Sample (Syro) files

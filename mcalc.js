var mcalc = (function(mcalc) {

    function normKey(key)
    {
        while (key < 0)
        {
            key += 12;
        }

        while (key >= 12)
        {
            key -= 12;
        }

        return key;
    }

    /** 
     * Keys (tones) enum 
     * @readonly
     * @enum {number}
     */
    mcalc.key = {
        "C":  0,
        "Cs": 1,
        "Db": 1,
        "D":  2,
        "Ds": 3,
        "Eb": 3,
        "E":  4,
        "F":  5,
        "Fs": 6,
        "Gb": 6,
        "G":  7,
        "Gs": 8,
        "Ab": 8,
        "A":  9,
        "As": 10,
        "Bb": 10,
        "B":  11
    };

    /** 
     * List of all keys 
     * @readonly
     * @type {number[]}
     */
    mcalc.keys = [
        mcalc.key.C,
        mcalc.key.Cs,
        mcalc.key.D,
        mcalc.key.Ds,
        mcalc.key.E,
        mcalc.key.F,
        mcalc.key.Fs,
        mcalc.key.G,
        mcalc.key.Gs,
        mcalc.key.A,
        mcalc.key.As,
        mcalc.key.B
    ];

    /**
     * Scale quality enum 
     * @readonly
     * @enum {string}
     */
    mcalc.scale = {
        Major: "Major"
    };

    /** 
     * Convert key value to string
     * @param {number} key - @see mcalc.key
     * @returns string
     */
    mcalc.keyToString = function(key)
    {
        switch (key)
        {
            case mcalc.key.C:
                return "C";
            case mcalc.key.Cs:
            case mcalc.key.Db:
                return "C#(Db)";
            case mcalc.key.D:
                return "D";
            case mcalc.key.Ds:
            case mcalc.key.Eb:
                return "D#(Eb)";
            case mcalc.key.E:
                return "E";
            case mcalc.key.F:
                return "F";
            case mcalc.key.Fs:
            case mcalc.key.Gb:
                return "F#(Gb)";
            case mcalc.key.G:
                return "G";
            case mcalc.key.Gs:
            case mcalc.key.Ab:
                return "G#(Ab)";
            case mcalc.key.A:
                return "A";
            case mcalc.key.As:
            case mcalc.key.Bb:
                return "A#(Bb)";
            case mcalc.key.B:
                return "B";
            default:
                return null;
        }
    };

    /**
     * Compute a scale in any key
     * @param {number} key - the tonic (root) of the key (@see mcalc.key)
     * @param {string} scaleType - the scale type (@see mcalc.scale)
     * @returns {number[]} list of tones in the scale (@see mcalc.key)
     */
    mcalc.computeScale = function(key, scaleType)
    {
        var scale = [];

        if (scaleType == mcalc.scale.Major)
        {
            // i
            scale.push(key);
    
            // ii
            key += 2;
            scale.push(normKey(key));
    
            // iii
            key += 2;
            scale.push(normKey(key));
    
            // iv
            key += 1;
            scale.push(normKey(key));
    
            // v
            key += 2;
            scale.push(normKey(key));
    
            // vi
            key += 2;
            scale.push(normKey(key));
    
            // vii
            key += 2;
            scale.push(normKey(key));
    
            // viii (octave)
            key += 1;
            scale.push(normKey(key));
        }
        else
        {
            throw "unknown scale type";
        }

        return scale;
    };

    /**
     * Convert an array of keys (tones) to a human-readable string
     * @param {number[]} keys - array of tones (@see mcalc.key)
     * @returns {string}
     */
    mcalc.keysToString = function(keys)
    {
        var temp = [];

        for (var i=0; i < keys.length; i++)
        {
            temp.push(mcalc.keyToString(keys[i]));
        }

        return temp.join(" ");
    };

    return mcalc;

})({});

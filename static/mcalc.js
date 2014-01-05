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

    function keyToString_(key)
    {
        switch (key)
        {
            case mcalc.key.C:
                return ["C"];
            case mcalc.key.Cs:
            case mcalc.key.Db:
                return ["C#", "D" + mcalc.symbol.Flat];
            case mcalc.key.D:
                return ["D"];
            case mcalc.key.Ds:
            case mcalc.key.Eb:
                return ["D#", "E" + mcalc.symbol.Flat];
            case mcalc.key.E:
                return ["E"];
            case mcalc.key.F:
                return ["F"];
            case mcalc.key.Fs:
            case mcalc.key.Gb:
                return ["F#", "G" + mcalc.symbol.Flat];
            case mcalc.key.G:
                return ["G"];
            case mcalc.key.Gs:
            case mcalc.key.Ab:
                return ["G#", "A" + mcalc.symbol.Flat];
            case mcalc.key.A:
                return ["A"];
            case mcalc.key.As:
            case mcalc.key.Bb:
                return ["A#", "B" + mcalc.symbol.Flat];
            case mcalc.key.B:
                return ["B"];
            default:
                return null;
        }
    };

    /**
     * Symbol constants
     * @readonly
     * @enum
     */
    mcalc.symbol = {
        Flat: "\u266D"
    };

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
        /** major scale */
        Major: "Major",
        /** natural minor scale */
        Minor: "Minor"
    };

    /**
     * Chord quality enum
     * @readonly
     * @enum {string}
     */
    mcalc.chord = {
        /** major */
        Major: "Major",
        /** minor */
        Minor: "Minor",
        /** augmented */
        Aug: "Aug",
        /** diminished */
        Dim: "Dim",
        /** major 7th */
        Major7: "Major7",
        /** minor seventh */
        Minor7: "Minor7",
        /** dominant seventh */
        Dom7: "Dom7",
        /** half-diminished seventh (minor 7, flat 5) */
        Minor7Flat5: "Minor7Flat5",
        /** fully-diminished seventh */
        Dim7: "Dim7",
        /** major 2nd (add 2) */
        Major2: "Major2",
        /** major suspended 2nd (sus 2) */
        MajorSus2: "MajorSus2",
        /** major with added 9th */
        MajorAdd9: "MajorAdd9",
        /** minor 2nd (add 2) */
        Minor2: "Minor2",
        /** minor suspended 2nd (sus 2) */
        MinorSus2: "MinorSus2",
        /** minor with added 9th */
        MinorAdd9: "MinorAdd9",
        /** minor 4th */
        Minor4: "Minor4",
        /** major 6th */
        Major6: "Major6",
        /** minor 6th */
        Minor6: "Minor6",
        /** major 9th */
        Major9: "Major9",
        /** dominant 9th */
        Dom9: "Dom9",
        /** minor 9th */
        Minor9: "Minor9",
        /** dominant 11th */
        Dom11: "Dom11",
        /** minor 11th */
        Minor11: "Minor11",
        /** dominant #11 (dominant 7, sharp 11) */
        Dom7Sharp11: "Dom7Sharp11",
        /** dominant 13th */
        Dom13: "Dom13",
        /** dominant 11th, add 13 */
        Dom11Add13: "Dom11Add13",
        /** dominant #11 13th chord (dominant 13, sharp 11) */
        Dom13Sharp11: "Dom13Sharp11",
    };

    /**
     * Chord complexity enum
     * @readonly
     * @enum {string}
     */
    mcalc.chordComplexity = {
        Triad: "Triad",
        Seventh: "Seventh",
        Ninth: "Ninth",
    };

    /** 
     * Convert key value to string
     * @param {number} key - @see mcalc.key
     * @returns string
     */
    mcalc.keyToString = function(key)
    {
        var s = keyToString_(key);

        if (s == null || s.length < 1)
        {
            return null;
        }

        if (s.length > 1)
        {
            return s[0] + " (" + s[1] + ")";
        }

        return s[0];
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
            // tonic
            scale.push(key);
    
            // second
            key += 2;
            scale.push(normKey(key));
    
            // third
            key += 2;
            scale.push(normKey(key));
    
            // fourth
            key += 1;
            scale.push(normKey(key));
    
            // fifth
            key += 2;
            scale.push(normKey(key));
    
            // sixth
            key += 2;
            scale.push(normKey(key));
    
            // seventh
            key += 2;
            scale.push(normKey(key));
    
            // eighth (octave)
            key += 1;
            scale.push(normKey(key));
        }
        else if (scaleType == mcalc.scale.Minor)
        {
            scale = mcalc.computeScale(key, mcalc.scale.Major);

            // lowered third
            scale[2] = normKey(scale[2] - 1);

            // lowered sixth
            scale[5] = normKey(scale[5] - 1);

            // lowered seventh
            scale[6] = normKey(scale[6] - 1);
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

        return temp.join(", ");
    };

    /**
     * Compute a chord in any key
     * @param {number} key - the root of the chord (@see mcalc.key)
     * @param {string} chordType - the chord type (@see mcalc.chord)
     * @returns {string[]} tones in the chord (@see mcalc.key)
     */
    mcalc.computeChord = function(key, chordType)
    {
        var chord = [];
        var scale = mcalc.computeScale(key, mcalc.scale.Major);

        if (chordType == mcalc.chord.Major)
        {
            // i
            chord.push(scale[0]);

            // iii (major third)
            chord.push(scale[2]);

            // v
            chord.push(scale[4]);
        }
        else if (chordType == mcalc.chord.Minor)
        {
            // i
            chord.push(scale[0]);

            // iii flat (minor third)
            chord.push(normKey(scale[2] - 1));

            // v
            chord.push(scale[4]);
        }
        else if (chordType == mcalc.chord.Aug)
        {
            // i
            chord.push(scale[0]);

            // iii (major third)
            chord.push(scale[2]);

            // v sharp (augmented fifth)
            chord.push(normKey(scale[4] + 1));
        }
        else if (chordType == mcalc.chord.Dim)
        {
            // i
            chord.push(scale[0]);

            // iii flat (minor third)
            chord.push(normKey(scale[2] - 1));

            // v flat (diminished fifth)
            chord.push(normKey(scale[4] - 1));
        }
        else if (chordType == mcalc.chord.Major7)
        {
            chord = mcalc.computeChord(key, mcalc.chord.Major);
            chord.push(scale[6]);
        }
        else if (chordType == mcalc.chord.Minor7)
        {
            chord = mcalc.computeChord(key, mcalc.chord.Minor);
            chord.push(normKey(scale[6] - 1));
        }
        else if (chordType == mcalc.chord.Dom7)
        {
            chord = mcalc.computeChord(key, mcalc.chord.Major);
            chord.push(normKey(scale[6] - 1));
        }
        else if (chordType == mcalc.chord.Minor7Flat5)
        {
            chord = mcalc.computeChord(key, mcalc.chord.Dim);
            chord.push(normKey(scale[6] - 1));
        }
        else if (chordType == mcalc.chord.Dim7)
        {
            chord = mcalc.computeChord(key, mcalc.chord.Dim);
            chord.push(normKey(scale[6] - 2));
        }
        else if (chordType == mcalc.chord.Major2)
        {
            // i
            chord.push(scale[0]);

            // ii
            chord.push(scale[1]);

            // iii (major third)
            chord.push(scale[2]);

            // v
            chord.push(scale[4]);
        }
        else if (chordType == mcalc.chord.MajorSus2)
        {
            // i
            chord.push(scale[0]);

            // ii
            chord.push(scale[1]);

            // v
            chord.push(scale[4]);
        }
        else if (chordType == mcalc.chord.MajorAdd9)
        {
            chord = mcalc.computeChord(key, mcalc.chord.Major);
            chord.push(scale[1]);
        }
        else if (chordType == mcalc.chord.Minor2)
        {
            // i
            chord.push(scale[0]);

            // ii
            chord.push(scale[1]);

            // iii flat (minor third)
            chord.push(normKey(scale[2] - 1));

            // v
            chord.push(scale[4]);
        }
        else if (chordType == mcalc.chord.MinorSus2)
        {
            chord = mcalc.computeChord(key, mcalc.chord.MajorSus2)
        }
        else if (chordType == mcalc.chord.MinorAdd9)
        {
            chord = mcalc.computeChord(key, mcalc.chord.Minor);
            chord.push(scale[1]);
        }
        else if (chordType == mcalc.chord.Minor4)
        {
            // i
            chord.push(scale[0]);

            // iii flat (minor third)
            chord.push(normKey(scale[2] - 1));

            // iv
            chord.push(scale[3]);

            // v
            chord.push(scale[4]);
        }
        else if (chordType == mcalc.chord.Major6)
        {
            // i
            chord.push(scale[0]);

            // iii (major third)
            chord.push(scale[2]);

            // v
            chord.push(scale[4]);

            // vi
            chord.push(scale[5]);
        }
        else if (chordType == mcalc.chord.Minor6)
        {
            // i
            chord.push(scale[0]);

            // iii (major third)
            chord.push(scale[2]);

            // v
            chord.push(scale[4]);

            // vi flat (minor sixth)
            chord.push(normKey(scale[5] - 1));
        }
        else if (chordType == mcalc.chord.Major9)
        {
            chord = mcalc.computeChord(key, mcalc.chord.Major7);
            chord.push(scale[1]);
        }
        else if (chordType == mcalc.chord.Dom9)
        {
            chord = mcalc.computeChord(key, mcalc.chord.Dom7);
            chord.push(scale[1]);
        }
        else if (chordType == mcalc.chord.Minor9)
        {
            chord = mcalc.computeChord(key, mcalc.chord.Minor7);
            chord.push(scale[1]);
        }
        else if (chordType == mcalc.chord.Dom11)
        {
            // i
            chord.push(scale[0]);

            // iii
            // no third

            // v
            chord.push(scale[4]);

            // vii (dominant 7th)
            chord.push(normKey(scale[6] - 1));

            // ix (9th)
            chord.push(scale[1]);

            // xi (11th)
            chord.push(scale[3]);
        }
        else if (chordType == mcalc.chord.Minor11)
        {
            chord = mcalc.computeChord(key, mcalc.chord.Minor9);
            chord.push(scale[3]);
        }
        else if (chordType == mcalc.chord.Dom7Sharp11)
        {
            chord = mcalc.computeChord(key, mcalc.chord.Dom9);

            // xi sharp (#11)
            chord.push(normKey(scale[3] + 1))
        }
        else if (chordType == mcalc.chord.Dom13)
        {
            chord = mcalc.computeChord(key, mcalc.chord.Dom9);

            // xiii (13th)
            chord.push(scale[4]);
        }
        else if (chordType == mcalc.chord.Dom11Add13)
        {
            chord = mcalc.computeChord(key, mcalc.chord.Dom11);

            // xiii (13th)
            chord.push(scale[4]);
        }
        else if (chordType == mcalc.chord.Dom13Sharp11)
        {
            chord = mcalc.computeChord(key, mcalc.chord.Dom7Sharp11);

            // xiii (13th)
            chord.push(scale[4]);
        }
        else
        {
            throw "unknown chord type";
        }

        return chord;
    };

    /**
     Compute the diatonic chords in a key
     @param {number} key - @see mcalc.key
     @param {string} scaleType - @see mcalc.scale
     @param {string} complexity - @see mcalc.chordComplexity
     @returns {mcalc.Chord[]}
     */
    mcalc.computeDiatonicChords = function(key, scaleType, complexity)
    {
        if (complexity === undefined)
        {
            complexity = mcalc.chordComplexity.Triad;
        }

        var scale = mcalc.computeScale(key, scaleType);
        var chords = [];

        if (scaleType == mcalc.scale.Major && complexity == mcalc.chordComplexity.Triad)
        {
            // I
            chords.push(new mcalc.Chord(scale[0], mcalc.chord.Major));
            // ii
            chords.push(new mcalc.Chord(scale[1], mcalc.chord.Minor));
            // iii
            chords.push(new mcalc.Chord(scale[2], mcalc.chord.Minor));
            // IV
            chords.push(new mcalc.Chord(scale[3], mcalc.chord.Major));
            // V
            chords.push(new mcalc.Chord(scale[4], mcalc.chord.Major));
            // vi
            chords.push(new mcalc.Chord(scale[5], mcalc.chord.Minor));
            // vii (dim)
            chords.push(new mcalc.Chord(scale[6], mcalc.chord.Dim));
        }
        else if (scaleType == mcalc.scale.Major && complexity == mcalc.chordComplexity.Seventh)
        {
            // I
            chords.push(new mcalc.Chord(scale[0], mcalc.chord.Major7));
            // ii
            chords.push(new mcalc.Chord(scale[1], mcalc.chord.Minor7));
            // iii
            chords.push(new mcalc.Chord(scale[2], mcalc.chord.Minor7));
            // IV
            chords.push(new mcalc.Chord(scale[3], mcalc.chord.Major7));
            // V
            chords.push(new mcalc.Chord(scale[4], mcalc.chord.Dom7));
            // vi
            chords.push(new mcalc.Chord(scale[5], mcalc.chord.Minor7));
            // vii (dim)
            chords.push(new mcalc.Chord(scale[6], mcalc.chord.Minor7Flat5));
        }
        else if (scaleType == mcalc.scale.Minor && complexity == mcalc.chordComplexity.Triad)
        {
            // i
            chords.push(new mcalc.Chord(scale[0], mcalc.chord.Minor));
            // ii (dim)
            chords.push(new mcalc.Chord(scale[1], mcalc.chord.Dim));
            // III
            chords.push(new mcalc.Chord(scale[2], mcalc.chord.Major));
            // iv
            chords.push(new mcalc.Chord(scale[3], mcalc.chord.Minor));
            // v
            chords.push(new mcalc.Chord(scale[4], mcalc.chord.Minor));
            // VI
            chords.push(new mcalc.Chord(scale[5], mcalc.chord.Major));
            // VII
            chords.push(new mcalc.Chord(scale[6], mcalc.chord.Major));
        }
        else if (scaleType == mcalc.scale.Minor && complexity == mcalc.chordComplexity.Seventh)
        {
            // i
            chords.push(new mcalc.Chord(scale[0], mcalc.chord.Minor7));
            // ii (dim)
            chords.push(new mcalc.Chord(scale[1], mcalc.chord.Minor7Flat5));
            // III
            chords.push(new mcalc.Chord(scale[2], mcalc.chord.Major7));
            // iv
            chords.push(new mcalc.Chord(scale[3], mcalc.chord.Minor7));
            // v
            chords.push(new mcalc.Chord(scale[4], mcalc.chord.Minor7));
            // VI
            chords.push(new mcalc.Chord(scale[5], mcalc.chord.Major7));
            // VII
            chords.push(new mcalc.Chord(scale[6], mcalc.chord.Dom7));
        }
        else if (scaleType == mcalc.scale.Major && complexity == mcalc.chordComplexity.Ninth)
        {
            // I
            chords.push(new mcalc.Chord(scale[0], mcalc.chord.Major9));
            // ii
            chords.push(new mcalc.Chord(scale[1], mcalc.chord.Minor9));
            // iii
            chords.push(null);
            // IV
            chords.push(new mcalc.Chord(scale[3], mcalc.chord.Major9));
            // V (dom)
            chords.push(new mcalc.Chord(scale[4], mcalc.chord.Dom9));
            // vi
            chords.push(new mcalc.Chord(scale[5], mcalc.chord.Minor9));
            // Vii (dim)
            chords.push(null);
        }
        else
        {
            throw "unsupported arguments";
        }

        return chords;
    };

    /**
     * Represents a chord
     * @constructor
     */
    mcalc.Chord = function(key, chordType)
    {
        var self = this;
        self.key = key;
        self.chordType = chordType;

        /**
         * Get the "suffix" of the chord name (e.g. 'm', 'dim', 'maj7', etc.)
         * @returns {string}
         */
        this.suffix = function()
        {
            if (self.chordType == mcalc.chord.Major)
            {
                return "";
            }
            else if (self.chordType == mcalc.chord.Minor)
            {
                return "m";
            }
            else if (self.chordType == mcalc.chord.Aug)
            {
                return "aug";
            }
            else if (self.chordType == mcalc.chord.Dim)
            {
                return "dim";
            }
            else if (self.chordType == mcalc.chord.Major7)
            {
                return "maj7";
            }
            else if (self.chordType == mcalc.chord.Minor7)
            {
                return "m7";
            }
            else if (self.chordType == mcalc.chord.Dom7)
            {
                return "7";
            }
            else if (self.chordType == mcalc.chord.Minor7Flat5)
            {
                return "m7" + mcalc.symbol.Flat + "5";
            }
            else if (self.chordType == mcalc.chord.Dim7)
            {
                return "dim7";
            }
            else if (self.chordType == mcalc.chord.Major2)
            {
                return "2";
            }
            else if (self.chordType == mcalc.chord.MajorSus2)
            {
                return "sus2";
            }
            else if (self.chordType == mcalc.chord.MajorAdd9)
            {
                return "add9";
            }
            else if (self.chordType == mcalc.chord.Minor2)
            {
                return "m2";
            }
            else if (self.chordType == mcalc.chord.MinorSus2)
            {
                return "m sus2";
            }
            else if (self.chordType == mcalc.chord.MinorAdd9)
            {
                return "m add9";
            }
            else if (self.chordType == mcalc.chord.Minor4)
            {
                return "m4";
            }
            else if (self.chordType == mcalc.chord.Major6)
            {
                return "6";
            }
            else if (self.chordType == mcalc.chord.Minor6)
            {
                return "m6";
            }
            else if (self.chordType == mcalc.chord.Major9)
            {
                return "maj9";
            }
            else if (self.chordType == mcalc.chord.Dom9)
            {
                return "9";
            }
            else if (self.chordType == mcalc.chord.Minor9)
            {
                return "m9";
            }
            else if (self.chordType == mcalc.chord.Dom11)
            {
                return "11";
            }
            else if (self.chordType == mcalc.chord.Minor11)
            {
                return "m11";
            }
            else if (self.chordType == mcalc.chord.Dom7Sharp11)
            {
                return "7(#11)";
            }
            else if (self.chordType == mcalc.chord.Dom13)
            {
                return "13";
            }
            else if (self.chordType == mcalc.chord.Dom11Add13)
            {
                return "11(13)";
            }
            else if (self.chordType == mcalc.chord.Dom13Sharp11)
            {
                return "13(#11)";
            }

            return null;
        };

        /**
         * Get the chord name (e.g. 'Cm')
         * @returns {string}
         */
        this.toString = function()
        {
            var s = keyToString_(self.key);
            var suffix = this.suffix();

            function toString_(s_)
            {
                if (suffix == null)
                {
                    return undefined;
                }

                return s_ + suffix;
            }

            if (s == null || s.length < 1)
            {
                return undefined;
            }

            if (s.length > 1)
            {
                return toString_(s[0]) + " (" + toString_(s[1]) + ")";
            }

            return toString_(s[0]);
        };

        /**
         * Get the tones in the chord
         * @returns {number[]} the tones in the chord (@see mcalc.key)
         */
        this.tones = function()
        {
            return mcalc.computeChord(this.key, this.chordType);
        };
    };

    return mcalc;

})({});

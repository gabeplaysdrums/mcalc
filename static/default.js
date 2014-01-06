// parse query string
(function() {

    var match;
    var regex = /([^&=]+)=?([^&]*)/g;
    var decode = function (s) { return decodeURIComponent(s.replace(/\+/g, " ")); };

    window.query = {};

    while (match = regex.exec(window.location.search.substring(1)))
    {
        window.query[decode(match[1])] = decode(match[2]);
    }

})();

// set up form
(function() {

    $("#key").change(function() {
        $("#form").submit();
    });

    if (window.query["key"])
    {
        $("#key option[value='" + window.query["key"] + "']").attr("selected", true);
    }

})();

// calculate
(function() {

    function formValueToKey(k)
    {
        return mcalc.key[k];
    }

    function keyToFormValue(key)
    {
        for (var k in mcalc.key)
        {
            if (mcalc.key[k] == key)
            {
                return k;
            }
        }

        return null;
    }

    function appendKeyLink(key, $parent, text)
    {
        if (text === undefined)
        {
            text = mcalc.keyToString(key);
        }

        var k = keyToFormValue(key);
        var $link = $("<a>")
            .addClass("key-link")
            .attr("href", "?key=" + k)
            .text(text);

        if (k.length > 1)
        {
            $link.addClass("black");
        }
        else
        {
            $link.addClass("white");
        }

        $parent.append($link);
    }

    var key = formValueToKey($("#key").val());

    function toggleHighlight($elem)
    {
        $elem.toggleClass("highlight");
        $table = $elem.parents("table");
        $others = $table
            .children("tbody")
            .children("tr")
            .children("th, td")
            .not(".highlight");

        $table.find(".dimmed").removeClass("dimmed");
        
        if ($table.find(".highlight").length > 0)
        {
            $others.addClass("dimmed");
        }
        else
        {
            $others.removeClass("dimmed");
        }
    }

    function playTones(tones, rakeMillis, noteSeconds)
    {
        var style = $("#playback-style").val();

        if (rakeMillis === undefined)
        {
            switch (style)
            {
                case "rake":
                    rakeMillis = 100;
                    break;
                default:
                    rakeMillis = 0;
            }
        }

        if (noteSeconds === undefined)
        {
            switch (style)
            {
                case "legato":
                    noteSeconds = 3;
                    break;
                case "rake":
                    noteSeconds = 1;
                    break;
                default:
                    noteSeconds = 0.5;
            }
        }


        var sounds = [];
        var offset = parseInt($("#playback-octave").val()) * 12;
        var lastKey = null;

        for (var i=0; i < tones.length; i++)
        {
            var currKey = tones[i];

            if (lastKey != null && currKey < lastKey)
            {
                offset += 12;
            }

            sounds.push(window.Notes.getCachedSound(currKey + offset, { seconds: noteSeconds }));
            lastKey = currKey;
        }

        for (var i=0; i < sounds.length; i++)
        {
            (function(sound) {

                window.setTimeout(
                    function(){ sound.play(); },
                    i * rakeMillis);

            })(sounds[i]);
        }
    }

    function appendTones(className, tones, root, rakeMillis, noteSeconds)
    {
        var $cell = $("." + className + ".tones");

        if ($cell.length > 0)
        {
            for (var i=0; i < tones.length; i++)
            {
                appendKeyLink(tones[i], $cell);
            }
        }

        $("." + className + ".piano")
            .sparkpiano({ keys: tones, root: root })
            .attr("title", mcalc.keysToString(tones))
            .prop("tones", tones)
            .click(function() { 
                playTones($(this).prop("tones"), rakeMillis, noteSeconds); 
                return false;
            });
    }

    function appendChordTones(className, key, chordType)
    {
        var chord = new mcalc.Chord(key, chordType);
        appendTones(className, chord.tones(), chord.key);
        $("." + className + ".name").text(chord.toString());
        $("." + className + ".name").click(function() {
            toggleHighlight($("." + className));
            return false;
        });
    }

    // major scale
    {
        var scale = mcalc.computeScale(key, mcalc.scale.Major);
        appendTones("scale-major", scale, scale[0], 500, 0.5);
    }

    // minor scale
    {
        var scale = mcalc.computeScale(key, mcalc.scale.Minor);
        appendTones("scale-minor", scale, scale[0], 500, 0.5);
    }

    {
        // major chord
        appendChordTones("chord-major", key, mcalc.chord.Major);

        // minor chord
        appendChordTones("chord-minor", key, mcalc.chord.Minor);

        // diminished chord
        appendChordTones("chord-dim", key, mcalc.chord.Dim);

        // major 7th chord
        appendChordTones("chord-major7", key, mcalc.chord.Major7);

        // minor 7th chord
        appendChordTones("chord-minor7", key, mcalc.chord.Minor7);

        // half diminished 7th chord
        appendChordTones("chord-minor7flat5", key, mcalc.chord.Minor7Flat5);

        // dominant 7th chord
        appendChordTones("chord-dom7", key, mcalc.chord.Dom7);

        // augmented chord
        appendChordTones("chord-aug", key, mcalc.chord.Aug);

        // fully diminished 7th chord
        appendChordTones("chord-dim7", key, mcalc.chord.Dim7);

        // major 2nd chord
        appendChordTones("chord-major2", key, mcalc.chord.Major2);

        // major 2nd suspended chord
        appendChordTones("chord-majorsus2", key, mcalc.chord.MajorSus2);

        // major added 9th chord
        appendChordTones("chord-majoradd9", key, mcalc.chord.MajorAdd9);

        // minor 2nd chord
        appendChordTones("chord-minor2", key, mcalc.chord.Minor2);

        // minor 4th chord
        appendChordTones("chord-minor4", key, mcalc.chord.Minor4);

        // minor added 9th chord
        appendChordTones("chord-minoradd9", key, mcalc.chord.MinorAdd9);

        // major 6th chord
        appendChordTones("chord-major6", key, mcalc.chord.Major6);

        // minor 6th chord
        appendChordTones("chord-minor6", key, mcalc.chord.Minor6);

        // major 9th chord
        appendChordTones("chord-major9", key, mcalc.chord.Major9);

        // dominant 9th chord
        appendChordTones("chord-dom9", key, mcalc.chord.Dom9);

        // minor 9th chord
        appendChordTones("chord-minor9", key, mcalc.chord.Minor9);

        // dominant 11th chord
        appendChordTones("chord-dom11", key, mcalc.chord.Dom11);

        // minor 11th chord
        appendChordTones("chord-minor11", key, mcalc.chord.Minor11);

        // dominant #11 chord
        appendChordTones("chord-dom7sharp11", key, mcalc.chord.Dom7Sharp11);

        // dominant 13th chord
        appendChordTones("chord-dom13", key, mcalc.chord.Dom13);

        // dominant 11th (add 13) chord
        appendChordTones("chord-dom11add13", key, mcalc.chord.Dom11Add13);

        // dominant #11 13th chord
        appendChordTones("chord-dom13sharp11", key, mcalc.chord.Dom13Sharp11);
    }

    function appendDiatonicChords($row, key, scaleType, complexity)
    {
        var chords = mcalc.computeDiatonicChords(key, scaleType, complexity);

        for (var i=0; i < chords.length; i++)
        {
            var $cell = $($row.children("td")[i]);

            if (chords[i] == null)
            {
                $cell.empty();
            }
            else
            {
                appendKeyLink(chords[i].key, $cell.find(".chord"), chords[i].toString());
                var tones = chords[i].tones();
                $cell.find(".piano")
                    .sparkpiano({ keys: tones, root: chords[i].key })
                    .attr("title", mcalc.keysToString(tones));

                // play tones when spark piano is clicked
                $cell.find(".piano table")
                    .prop("tones", tones)
                    .click(function() {
                        playTones($(this).prop("tones")); 
                        return false;
                    });

                $cell.click(function() {
                    toggleHighlight($(this));
                    return false;
                });
            }
        }
    }

    // diatonic chords
    {
        appendDiatonicChords($("#diatonic-chords-major"), 
            key, mcalc.scale.Major, mcalc.chordComplexity.Triad);
        appendDiatonicChords($("#diatonic-chords-major7"), 
            key, mcalc.scale.Major, mcalc.chordComplexity.Seventh);
        appendDiatonicChords($("#diatonic-chords-major9"), 
            key, mcalc.scale.Major, mcalc.chordComplexity.Ninth);
        appendDiatonicChords($("#diatonic-chords-major11"), 
            key, mcalc.scale.Major, mcalc.chordComplexity.Eleventh);
        appendDiatonicChords($("#diatonic-chords-major13"), 
            key, mcalc.scale.Major, mcalc.chordComplexity.Thirteenth);
        appendDiatonicChords($("#diatonic-chords-minor"), 
            key, mcalc.scale.Minor, mcalc.chordComplexity.Triad);
        appendDiatonicChords($("#diatonic-chords-minor7"), 
            key, mcalc.scale.Minor, mcalc.chordComplexity.Seventh);
    }

    function getPlayablePianoSound(key)
    {
        return window.Notes.getCachedSound(
            parseInt($("#playback-octave").val()) * 12 + key,
            { seconds: 3 });
    }

    // keyboard controls
    $(window).keydown(function(event) {

        function setOctave(n)
        {
            $("#playback-octave option[value=" + n + "]").attr("selected", true);
        }

        function getOctave(n)
        {
            return parseInt($("#playback-octave").val());
        }

        function selectDelta($select, delta, wrap)
        {
            var index = $select.prop("selectedIndex");
            var options = $select.prop("options");

            index += delta;

            if (index < 0)
            {
                if (wrap)
                {
                    index = options.length + index;
                }
                else
                {
                    index = 0;
                }
            }

            if (index >= options.length)
            {
                if (wrap)
                {
                    index = index % options.length;
                }
                else
                {
                    index = options.length - 1;
                }
            }

            $select.prop("selectedIndex", index);
        }

        var $pianos = $(".piano");

        function keyon(key)
        {
            $pianos.sparkpiano("keyon", key);

            var sound = getPlayablePianoSound(key);
            sound.play();
        }

        switch (event.keyCode)
        {
            case 90: // z
                selectDelta($("#playback-octave"), -1, false);
                break;
            case 88: // x
                selectDelta($("#playback-octave"), 1, false);
                break;
            case 67: // c
                selectDelta($("#playback-style"), -1, true);
                break;
            case 86: // v
                selectDelta($("#playback-style"), 1, true);
                break;
            case 65:  // a (C)
                keyon(mcalc.key.C);
                break;
            case 87:  // w (C#/Db)
                keyon(mcalc.key.Cs);
                break;
            case 83:  // s (D)
                keyon(mcalc.key.D);
                break;
            case 69:  // e (D#/Eb)
                keyon(mcalc.key.Ds);
                break;
            case 68:  // d (E)
                keyon(mcalc.key.E);
                break;
            case 70:  // f (F)
                keyon(mcalc.key.F);
                break;
            case 84:  // t (F#/Gb)
                keyon(mcalc.key.Fs);
                break;
            case 71:  // g (G)
                keyon(mcalc.key.G);
                break;
            case 89:  // y (G#/Ab)
                keyon(mcalc.key.Gs);
                break;
            case 72:  // h (A)
                keyon(mcalc.key.A);
                break;
            case 85:  // u (A#/Bb)
                keyon(mcalc.key.As);
                break;
            case 74:  // j (B)
                keyon(mcalc.key.B);
                break;
            case 75:  // k (C)
                keyon(mcalc.key.C + 12);
                break;
            case 79:  // o (C#/Db)
                keyon(mcalc.key.Cs + 12);
                break;
            case 76:  // l (D)
                keyon(mcalc.key.D + 12);
                break;
            case 80:  // p (D#/Eb)
                keyon(mcalc.key.Ds + 12);
                break;
            case 186: // ; (E)
                keyon(mcalc.key.E + 12);
                break;
            case 222: // ' (F)
                keyon(mcalc.key.F + 12);
                break;
        }

    });

    $(window).keyup(function(event) {

        var $pianos = $(".piano");

        function keyoff(key)
        {
            $pianos.sparkpiano("keyoff", key);

            var sound = getPlayablePianoSound(key);
            sound.pause();
            sound.currentTime = 0;
        }

        switch (event.keyCode)
        {
            case 65:  // a (C)
                keyoff(mcalc.key.C);
                break;
            case 87:  // w (C#/Db)
                keyoff(mcalc.key.Cs);
                break;
            case 83:  // s (D)
                keyoff(mcalc.key.D);
                break;
            case 69:  // e (D#/Eb)
                keyoff(mcalc.key.Ds);
                break;
            case 68:  // d (E)
                keyoff(mcalc.key.E);
                break;
            case 70:  // f (F)
                keyoff(mcalc.key.F);
                break;
            case 84:  // t (F#/Gb)
                keyoff(mcalc.key.Fs);
                break;
            case 71:  // g (G)
                keyoff(mcalc.key.G);
                break;
            case 89:  // y (G#/Ab)
                keyoff(mcalc.key.Gs);
                break;
            case 72:  // h (A)
                keyoff(mcalc.key.A);
                break;
            case 85:  // u (A#/Bb)
                keyoff(mcalc.key.As);
                break;
            case 74:  // j (B)
                keyoff(mcalc.key.B);
                break;
            case 75:  // k (C)
                keyoff(mcalc.key.C + 12);
                break;
            case 79:  // o (C#/Db)
                keyoff(mcalc.key.Cs + 12);
                break;
            case 76:  // l (D)
                keyoff(mcalc.key.D + 12);
                break;
            case 80:  // p (D#/Eb)
                keyoff(mcalc.key.Ds + 12);
                break;
            case 186: // ; (E)
                keyoff(mcalc.key.E + 12);
                break;
            case 222: // ' (F)
                keyoff(mcalc.key.F + 12);
                break;
        }

    });

})();

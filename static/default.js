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

    function appendTones(className, tones, root)
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
            .attr("title", mcalc.keysToString(tones));
    }

    function appendChordTones(className, key, chordType)
    {
        var chord = new mcalc.Chord(key, chordType);
        appendTones(className, chord.tones(), chord.key);
        $("." + className + ".name").text(chord.toString());
    }

    // major scale
    {
        var scale = mcalc.computeScale(key, mcalc.scale.Major);
        appendTones("scale-major", scale, scale[0]);
    }

    // minor scale
    {
        var scale = mcalc.computeScale(key, mcalc.scale.Minor);
        appendTones("scale-minor", scale, scale[0]);
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
    }

    function appendDiatonicChords($row, key, scaleType, sevenths)
    {
        var chords = mcalc.computeDiatonicChords(key, scaleType, sevenths);

        for (var i=0; i < chords.length; i++)
        {
            var $cell = $($row.children("td")[i]);
            appendKeyLink(chords[i].key, $cell.find(".chord"), chords[i].toString());
            $cell.find(".piano")
                .sparkpiano({ keys: chords[i].tones(), root: chords[i].key })
                .attr("title", mcalc.keysToString(chords[i].tones()));
        }
    }

    // diatonic chords
    {
        appendDiatonicChords($("#diatonic-chords-major"), key, mcalc.scale.Major, false);
        appendDiatonicChords($("#diatonic-chords-major7"), key, mcalc.scale.Major, true);
        appendDiatonicChords($("#diatonic-chords-minor"), key, mcalc.scale.Minor, false);
        appendDiatonicChords($("#diatonic-chords-minor7"), key, mcalc.scale.Minor, true);
    }

    // piano test
    {
        $("#piano-test").sparkpiano({
            keys: [
                mcalc.key.C,
                mcalc.key.E,
                mcalc.key.G,
                mcalc.key.D
            ],
            root: mcalc.key.C
        })
    }

})();

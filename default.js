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

    // major scale
    {
        var scale = mcalc.computeScale(key, mcalc.scale.Major);

        for (var i=0; i < scale.length; i++)
        {
            appendKeyLink(scale[i], $("#scale-major"));
        }
    }

    function appendChordTones($row, key, chordType)
    {
        var chord = new mcalc.Chord(key, chordType);
        var tones = chord.tones();
        var $cell = $row.find(".tones");
        
        $row.find(".name").text(chord.toString());

        for (var i=0; i < tones.length; i++)
        {
            appendKeyLink(tones[i], $cell);
        }
    }

    {
        // major chord
        appendChordTones($("#chord-major"), key, mcalc.chord.Major);

        // minor chord
        appendChordTones($("#chord-minor"), key, mcalc.chord.Minor);

        // diminished chord
        appendChordTones($("#chord-dim"), key, mcalc.chord.Dim);

        // augmented chord
        appendChordTones($("#chord-aug"), key, mcalc.chord.Aug);

        // major 7th chord
        appendChordTones($("#chord-major7"), key, mcalc.chord.Major7);

        // minor 7th chord
        appendChordTones($("#chord-minor7"), key, mcalc.chord.Minor7);

        // dominant 7th chord
        appendChordTones($("#chord-dom7"), key, mcalc.chord.Dom7);

        // half diminished 7th chord
        appendChordTones($("#chord-minor7flat5"), key, mcalc.chord.Minor7Flat5);

        // fully diminished 7th chord
        appendChordTones($("#chord-dim7"), key, mcalc.chord.Dim7);
    }

    function appendDiatonicChords($row, key, scaleType, sevenths)
    {
        var chords = mcalc.computeDiatonicChords(key, scaleType, sevenths);

        for (var i=0; i < chords.length; i++)
        {
            var $cell = $($row.find("td")[i + 1]);
            appendKeyLink(chords[i].key, $cell, chords[i].toString());
        }
    }

    // diatonic chords
    {
        appendDiatonicChords($("#chords-diatonic"), key, mcalc.scale.Major, false);
        appendDiatonicChords($("#chords-diatonic7"), key, mcalc.scale.Major, true);
    }

})();

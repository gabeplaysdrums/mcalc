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

    function appendTones($row, chord)
    {
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
        appendTones($("#chord-major"), new mcalc.Chord(key, mcalc.chord.Major));

        // minor chord
        appendTones($("#chord-minor"), new mcalc.Chord(key, mcalc.chord.Minor));

        // diminished chord
        appendTones($("#chord-dim"), new mcalc.Chord(key, mcalc.chord.Dim));

        // augmented chord
        appendTones($("#chord-aug"), new mcalc.Chord(key, mcalc.chord.Aug));
    }

    // diatonic chords
    {
        var chords = mcalc.computeDiatonicChords(key, mcalc.scale.Major);

        for (var i=0; i < chords.length; i++)
        {
            var $cell = $($("#chords-diatonic td")[i + 1]);
            appendKeyLink(chords[i].key, $cell, chords[i].toString());
        }
    }

})();

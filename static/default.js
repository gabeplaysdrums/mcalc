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
        $("." + className).click(function() {
            toggleHighlight($("." + className));
        });
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
            if (chords[i] != null)
            {
                var $cell = $($row.children("td")[i]);
                appendKeyLink(chords[i].key, $cell.find(".chord"), chords[i].toString());
                $cell.find(".piano")
                    .sparkpiano({ keys: chords[i].tones(), root: chords[i].key })
                    .attr("title", mcalc.keysToString(chords[i].tones()));

                $cell.click(function() {
                    toggleHighlight($(this));
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

})();

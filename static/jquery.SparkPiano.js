(function() {

    var Markup = [
        "<table class=\"sparkpiano\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\">",
        "  <tr class=\"sparkpiano-top\">",
        "    <td class=\"sparkpiano-white sparkpiano-key-C\"></td>",
        "    <td class=\"sparkpiano-black sparkpiano-left sparkpiano-key-Cs\"></td>",
        "    <td class=\"sparkpiano-black sparkpiano-right sparkpiano-key-Cs\"></td>",
        "    <td class=\"sparkpiano-black sparkpiano-left sparkpiano-key-Ds\"></td>",
        "    <td class=\"sparkpiano-black sparkpiano-right sparkpiano-key-Ds\"></td>",
        "    <td class=\"sparkpiano-white sparkpiano-right sparkpiano-key-E\"></td>",
        "    <td class=\"sparkpiano-white sparkpiano-left sparkpiano-key-F\"></td>",
        "    <td class=\"sparkpiano-black sparkpiano-left sparkpiano-key-Fs\"></td>",
        "    <td class=\"sparkpiano-black sparkpiano-right sparkpiano-key-Fs\"></td>",
        "    <td class=\"sparkpiano-black sparkpiano-left sparkpiano-key-Gs\"></td>",
        "    <td class=\"sparkpiano-black sparkpiano-right sparkpiano-key-Gs\"></td>",
        "    <td class=\"sparkpiano-black sparkpiano-left sparkpiano-key-As\"></td>",
        "    <td class=\"sparkpiano-black sparkpiano-right sparkpiano-key-As\"></td>",
        "    <td class=\"sparkpiano-white sparkpiano-right sparkpiano-key-B\"></td>",
        "  </tr>",
        "  <tr class=\"sparkpiano-bottom\">",
        "    <td class=\"sparkpiano-key-C\"></td>",
        "    <td class=\"sparkpiano-right sparkpiano-key-C\"></td>",
        "    <td class=\"sparkpiano-left sparkpiano-key-D\"></td>",
        "    <td class=\"sparkpiano-right sparkpiano-key-D\"></td>",
        "    <td class=\"sparkpiano-left sparkpiano-key-E\"></td>",
        "    <td class=\"sparkpiano-right sparkpiano-key-E\"></td>",
        "    <td class=\"sparkpiano-left sparkpiano-key-F\"></td>",
        "    <td class=\"sparkpiano-right sparkpiano-key-F\"></td>",
        "    <td class=\"sparkpiano-left sparkpiano-key-G\"></td>",
        "    <td class=\"sparkpiano-right sparkpiano-key-G\"></td>",
        "    <td class=\"sparkpiano-left sparkpiano-key-A\"></td>",
        "    <td class=\"sparkpiano-right sparkpiano-key-A\"></td>",
        "    <td class=\"sparkpiano-left sparkpiano-key-B\"></td>",
        "    <td class=\"sparkpiano-right sparkpiano-key-B\"></td>",
        "  </tr>",
        "</table>"
    ].join("");

    var key = {
        "C":  0,
        "Cs": 1,
        "D":  2,
        "Ds": 3,
        "E":  4,
        "F":  5,
        "Fs": 6,
        "G":  7,
        "Gs": 8,
        "A":  9,
        "As": 10,
        "B":  11
    };

    var colors = [
        "blue",
        "orange",
        "yellow",
        "darkgreen",
    ];

    function normKey(k)
    {
        while (k < 0)
        {
            k += 12;
        }

        while (k >= 12)
        {
            k -= 12;
        }

        return k;
    }

    function keyToString(key_)
    {
        key_ = normKey(key_);

        for (k in key)
        {
            if (key[k] == key_)
            {
                return k;
            }
        }

        return null;
    }

    $.widget('mcalc.sparkpiano', {

        options: {
            keys: [],
            root: key.C
        },

        _create: function()
        {
            this.element.html(Markup);

            var lastKey = null;
            var currColorIndex = 0;

            for (var i=0; i < this.options.keys.length; i++)
            {
                var currKey = this.options.keys[i];

                // change the color for each new octave
                if (lastKey != null && 
                    (normKey(lastKey - this.options.root) == 0 ||
                    normKey(currKey - this.options.root) < normKey(lastKey - this.options.root)))
                {
                    currColorIndex++;
                }

                lastKey = currKey;

                // don't overwrite the color of the root key
                if (i > 0 && currKey == this.options.root)
                {
                    continue;
                }

                this.element
                    .find(".sparkpiano-key-" + keyToString(currKey))
                    .css("background-color", colors[currColorIndex]);
            }
        },

        keyon: function(key_)
        {
            this.element
                .find(".sparkpiano-key-" + keyToString(key_))
                .addClass("sparkpiano-keyon");
        },

        keyoff: function(key_)
        {
            this.element
                .find(".sparkpiano-key-" + keyToString(key_))
                .removeClass("sparkpiano-keyon");
        },

    });

})();

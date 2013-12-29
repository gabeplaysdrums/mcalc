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

    $.widget('mcalc.sparkpiano', {

        options: {
            keys: [],
            root: null
        },

        _create: function()
        {
            this.element.html(Markup);

            for (var i=0; i < this.options.keys.length; i++)
            {
                for (var k in key)
                {
                    if (key[k] == this.options.keys[i])
                    {
                        this.element.find(".sparkpiano-key-" + k).css("background-color", "orange");
                        break;
                    }
                }
            }

            for (var k in key)
            {
                if (key[k] == this.options.root)
                {
                    this.element.find(".sparkpiano-key-" + k).css("background-color", "blue");
                    break;
                }
            }

        }

    });

})();

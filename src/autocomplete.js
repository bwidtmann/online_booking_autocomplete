var LoadAutocomplete = function() {

    var substringMatcher = function(strs) {
        return function findMatches(q, cb) {
            var matches, substrRegex;

            // an array that will be populated with substring matches
            matches = [];

            // regex used to determine if a string contains the substring `q`
            substrRegex = new RegExp(q, 'i');

            // iterate through the pool of strings and for any string that
            // contains the substring `q`, add it to the `matches` array
            $.each(strs, function(i, str) {
                if (substrRegex.test(str.name)) {
                    // the typeahead jQuery plugin expects suggestions to a
                    // JavaScript object, refer to typeahead docs for more info
                    matches.push({ value: str.name });
                }
            });

            cb(matches);
        };
    };

    var getHotelIdsbyName = function(name) {
        var hotelids, result;

        var resultHotels = $.grep(hotels, function(e) {
            return e.name === name;
        });
        var resultKeywords = $.grep(keywords, function(e) {
            return e.name === name;
        });
        result = resultHotels.concat(resultKeywords);

        if (result.length === 0) {
            hotelids = []
        } else if (result.length === 1) {
            hotelids = result[0].hotelids;
        } else {
            hotelids = result[0].hotelids;
        }
        return hotelids;
    };

    var storeHotelIds = function(name) {
        $('#hotelids').val(getHotelIdsbyName(name));
    };

    $('#gob_autocomplete').typeahead({
            hint: true,
            highlight: true,
            minLength: 1,
            limit: 1
        },
        {
            name: 'keywords',
            displayKey: 'value',
            templates: {
                header: '<h3>##Keywords##</h3>'
            },
            source: substringMatcher(keywords),
            limit: 1
        },
        {
            name: 'hotels',
            displayKey: 'value',
            templates: {
                header: '<h3>##Hotels##</h3>'
            },
            source: substringMatcher(hotels),
            limit: 1
        });

    $('#gob_autocomplete').on('blur', function() {
        storeHotelIds($('#gob_autocomplete').val());
    });
    $('#gob_autocomplete').on('typeahead:selected', function(event, data) {
        storeHotelIds(data.value);
    });
};
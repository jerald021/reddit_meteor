SearchSource.defineSource('packages', function(searchText, options) {
    var options = {sort: {isoScore: -1}, limit: 20};

    if(searchText) {
        var regExp = buildRegExp(searchText);
        var selector = {$or: [
            {title: regExp},
            {description: regExp}
        ]};
        return Posts.find(selector, options).fetch();
    }
});

function buildRegExp(searchText) {
    // this is a dumb implementation
    var parts = searchText.trim().split(/[ \-\:]+/);
    var RegExpBusqueda = new RegExp("(" + parts.join('|') + ")", "ig");
    return RegExpBusqueda;
}
SearchSource.defineSource('packages', function(searchText, options) {
    var options = {sort: {title: -1}, limit: 20};

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
    var parts = searchText.trim().split(/[ \-\:]+/);
    return new RegExp("(" + parts.join('|') + ")", "ig");
}
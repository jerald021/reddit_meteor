var options = {
    keepHistory: 1000 * 60 * 5,
    localSearch: true
};
var fields = ['title', 'description'];// introducir el nombre de las propiedades a bucar dentro de la array y tambien en agregarlas en el server
PackageSearch = new SearchSource('packages', fields, options);

Template.searchResult.helpers({
    getPackages: function() {
        return PackageSearch.getData({
            transform: function(matchText, regExp) {
                return matchText.replace(regExp, "<b>$&</b>")
            },
            sort: {title: -1}
        });
    },
    isLoading: function() {
        return PackageSearch.getStatus().loading;
    }
});

Template.searchResult.rendered = function() {
    PackageSearch.search('');
};

Template.searchBox.events({
    "keyup #search-box": _.throttle(function(e) {
        e.preventDefault();
        var text = $(e.target).val().trim();
        PackageSearch.search(text);
    }, 150),
    "submit": function (e) {
        e.preventDefault();
        //return false;
    }
});

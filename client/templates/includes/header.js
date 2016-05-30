Template.header.helpers({
    activeRouteClass: function(/* route names */) {
        var args = Array.prototype.slice.call(arguments, 0);
        args.pop();

        var active = _.any(args, function(name) {
            return Router.current() && Router.current().route.getName() === name
        });
        return active && 'active';
    },
    precargarImagenes: function () {
        $.preloadImages = function(){
            for(var i = 0; i<arguments.length; i++){
                $("<img />").attr("src", arguments[i]);
            }
        };
        $.preloadImages("img/reddit-header-icono-default.png", "img/reddit-header-icono-hover.png");
    }

});
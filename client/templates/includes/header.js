//Template.header.onRendered = function() {
//    $.imgpreload(["img/reddit-header-icono-default.png", "img/reddit-header-icono-hover.png"],
//        {
//            each: function()
//            {
//                // callback invoked when each image is loaded
//                // this = dom image object
//                // check for success with: $(this).data('loaded')
//            },
//            all: function()
//            {
//                console.log("Imagenes precargadas");
//                // callback invoked when all images have loaded
//                // this = array of dom image objects
//                // check for success with: $(this[i]).data('loaded')
//            }
//        });
//};

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
//Template.header.events({
//    'click .cerrar-menu': function() {
//        $(".fix-cerrar").addClass('collapsed collapse');
//    }
//});

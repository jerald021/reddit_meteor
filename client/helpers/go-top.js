// Falta el hook scrollUp
Meteor.startup(function () {
    $(window).scroll(function(){
        if( $(this).scrollTop() > 0 ){
            $('#ir-arriba').slideDown(300);
        } else {
            $('#ir-arriba').slideUp(300);
        }
    });
    $('#ir-arriba').click(function(){
        //$(window).scrollTop(0);
        $('html, body').animate({
            scrollTop: 0
        }, 300);
    });
});
Template.goTop.events({
    'click #go-top': function(e){
        e.preventDefault();
        $('html, body').animate({
            scrollTop: 0
        }, 300);
    }
});

Template.goTop.onRendered(function() {
    $(window).scroll(function(){
        if( $(this).scrollTop() > 0 ){
            $('#go-top').slideDown(300);
        } else {
            $('#go-top').slideUp(300);
        }
    });
});
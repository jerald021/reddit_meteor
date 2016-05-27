Template.userHeaderMenu.helpers({
    activeRouteClass: function(/* route names */) {
        var args = Array.prototype.slice.call(arguments, 0);
        args.pop();

        var active = _.any(args, function(name) {
            return Router.current() && Router.current().route.getName() === name
        });
        return active && 'active';
    }
});

Template.userHeaderMenu.events({
    'click #logout': function (event) {
        event.preventDefault();
        Meteor.logout();
        Bert.alert({
            title: "Bye :(",
            type: 'success',
            style: 'fixed-top',
            icon: 'fa-bell'
        });
        Router.go('home');
    },
    'click #resend-email': function () {
        var user = Meteor.user();

        if(user.emails[0].verified == true){
            return Bert.alert({
                title: "User email already verified",
                type: 'warning',
                style: 'growl-top-right',
                icon: 'fa-info'
            });
            //return swal({
            //    title: "User email already verified",
            //    showConfirmButton: true,
            //    type: "info"
            //});
        }
        else{
            Meteor.call('resendEmail', function(error) {
                if (error){
                    return alert(error.reason);
                }
                else {
                    return Bert.alert({
                        title: "Email sent correctly",
                        message: "Please check your email",
                        type: 'info',
                        style: 'growl-top-right',
                        icon: 'fa-info'
                    });
                    //return swal({
                    //    title: "Email sent correctly",
                    //    text: "Please check your email",
                    //    showConfirmButton: true,
                    //    type: "success"
                    //});
                }
            });
        }
    }
});
Template.userProfile.helpers({
    getEmail: function(){
        var user = Meteor.user();
        if(user && user.emails){
            return user.emails[0].address;
        }
    },
    getAvatar: function () {
        return Meteor.users.findOne();
    }
});

Template.userProfile.events({
   'submit form' : function(event, result){
        event.preventDefault();
        //var username = $('#username').val();
        var email = $('#email').val();
        Meteor.call('updateProfile',username, email);

        if(result){
            Router.go('home');
            return Bert.alert({
                title: "Data updated correctly",
                type: 'success',
                style: 'growl-top-right',
                icon: 'fa-check'
            });
            //swal({
            //   title: "Data updated correctly",
            //   showConfirmButton: true,
            //   type: "success"
            //});
        }
   }
});
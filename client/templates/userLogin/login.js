Template.login.events({
    'submit form': function(event){
        event.preventDefault();
        var username = $('#username').val();
        var password = $('#password').val();
         //var email = $('[name=email]').val();
       //var password = $('[name=password]').val();

        Meteor.loginWithPassword(username, password, function (error) {
            if(error){
                //console.log(error.reason);
                //return swal({
                //    title: "Username or password incorrect",
                //    text: "Please try again",
                //    showConfirmButton: true,
                //    closeOnConfirm: true,
                //    type: "error"
                //});
                return Bert.alert({
                    title: "Username or password incorrect",
                    message: "Please try again",
                    type: 'danger',
                    style: 'growl-top-right',
                    icon: 'fa-warning'
                });
            }
            else{
                var user = Meteor.users.findOne({_id: this._id});
                Router.go('home');
                Bert.alert({
                    title: "Welcome :)",
                    type: 'success',
                    style: 'fixed-top',
                    icon: 'fa-bell'
                });
              //  alert("Bienvenido "+ email); // cambiar por nombre
            }
        });
    }
});
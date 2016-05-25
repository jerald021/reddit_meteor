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
                return swal({
                    title: "Username or password incorrect",
                    text: "Please try again",
                    showConfirmButton: true,
                    closeOnConfirm: true,
                    type: "error"
                });
            }
            else{
                Router.go('home');
              //  alert("Bienvenido "+ email); // cambiar por nombre
            }
        });
    }
});
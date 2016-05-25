Template.register.events({
    'submit form': function(event){
        event.preventDefault();
        var username = $('#username').val();
        var email = $('#email').val();
        var password = $('#password').val();
        var passwordAgain = $('#password-again').val();
        //var email = $('[name=email]').val();
        //var password = $('[name=password]').val();

        // Check password is at least 6 chars long
        var isValidPassword = function(pwd, pwd2) {
            if (pwd === pwd2) {
                return pwd.length >= 6 ? true : false; //comprobar si es mayor o igual a 6 caracteres, si lo es devuelve true
            } else {
                return swal({
                    title: "Passwords don’t match",
                    text: "Please try again",
                    showConfirmButton: true,
                    type: "error"
                });
            }
        }

        if (isValidPassword(password, passwordAgain)) {
            Accounts.createUser({
                username: username,
                email: email,
                password: password
            }, function(error){
                if(error){
                    console.log(error.reason); // Output error if registration fails
                } else {
                    Router.go("home"); // Redirect userLogin if registration succeeds
                    swal({
                        title: "Please check your email",
                        text: "to activate your account",
                        showConfirmButton: true,
                        type: "warning"
                    });
                }
            });
            //Meteor.call('sendVerificationLink',function(error){
            //    if (error) {
            //        return alert(error.reason);
            //    } else {
            //        return alert('Welcome!', 'success');
            //     }
            //});
        }
    }
});
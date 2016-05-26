// IMPORTANTE !
//falta comprobar si la password actual es correcta
Template.changePassword.events({
    'submit form': function(event){
        event.preventDefault();
        var currentPassword = $('#current-password').val();
        var newPassword = $('#new-password').val();
        var passwordAgain = $('#confirm-new-password').val();

        // Check password is at least 6 chars long
        var isValidPassword = function(pwd, pwd2) {
            if (pwd === pwd2) {
                return pwd.length >= 6 ? true : false; //comprobar si es mayor o igual a 6 caracteres, si lo es devuelve true
            } else {
                return Bert.alert({
                    title: "Passwords don’t match",
                    message: "Please try again",
                    type: 'danger',
                    style: 'growl-top-right',
                    icon: 'fa-warning'
                });
                //return swal({
                //    title: "Passwords don’t match",
                //    text: "Please try again",
                //    showConfirmButton: true,
                //    type: "error"
                //});
            }
        };
        //var digest = Package.sha.SHA256+currentPassword;
        //var digest = Package.sha.SHA256($('#current-password').val());
        //Meteor.call('checkPassword', digest, function(err, result) {
        //    if (result) {
        //        console.log('the passwords match!');
        //    }
        //}
        if (isValidPassword(newPassword, passwordAgain)){
            Accounts.changePassword(currentPassword, newPassword, function (error) {
                if (error) {
                    return console.log(error.reason);
                }
                else {
                    Bert.alert({
                        title: "Password successfully changed",
                        message: "Please Log In",
                        type: 'success',
                        style: 'growl-top-right',
                        icon: 'fa-check'
                    });
                    //swal({
                    //    title: "Password successfully changed",
                    //    text: "Please Log In",
                    //    showConfirmButton: true,
                    //    closeOnConfirm: true,
                    //    type: "success"
                    //});
                    Router.go("login");
                }
            }, function (error) {
                if (error) {
                    console.log(error.reason); // Output error if registration fails
                } else {
                    Router.go("home"); // Redirect userLogin if registration succeeds
                }
            });
        }
    }
});
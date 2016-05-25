Meteor.methods({
    resendEmail: function(){
        var id = Meteor.userId();
        return Accounts.sendVerificationEmail(id);
    },

    // NO SE USA DE MOMENTO
    checkPassword: function(digest) {
        check(digest, String);

        if (this.userId) {
            var user = Meteor.user();
            var password = {digest: digest, algorithm: 'sha-256'};
            var result = Accounts._checkPassword(user, password);
            return result.error == null;
        }
        else {
            return false;
        }
    },
    updateProfile: function (newUsername, email) {
        check(newUsername, String);
        check(email, String);
        var user = Meteor.user();
        //var emaildb = user.emails[0].address;

        if(newUsername != user.username){
            Meteor.users.update(user._id, {$set: {username: newUsername}});
            console.log("Username actualizado");
        }
        else if(email != user.emails[0].address){
            Accounts.removeEmail(user._id, user.emails[0].address);
            Accounts.addEmail(user._id, email);
            //Meteor.users.update(user._id, {$set: {address: email}});
            console.log("Email actualizado");
        }
    }
});
Accounts.onCreateUser(function (options, user) {
    // Use provided profile in options, or create an empty object
    user.profile = options.profile || {};

/*
    // Assigns first and last names to the newly created userLogin object
    userLogin.profile.firstName = options.firstName;
    userLogin.profile.lastName = options.lastName;
*/
    // Basic Role Setup
    user.roles = ["user"];

    // Basic Profile Picture Setup
    //user.profile.profPicture = "img/default-user.png";
    user.profile.profPicture = Meteor.absoluteUrl() + "img/default-user.png";

    // Returns the userLogin object
    return user;
});

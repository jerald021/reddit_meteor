var Schemas = {};

Schemas.UserProfile = new SimpleSchema({
    profPicture: {
        type: String,
        regEx: /^[a-zA-Z-]{2,25}$/,
        optional: true
    }
});

Schemas.User = new SimpleSchema({
    username: {
        type: String,
        regEx: /^[a-z0-9A-Z_]{3,15}$/
    },
    emails: {
        type: [Object],
        optional: true
    },
    "emails.$.address": {
        type: String,
        regEx: SimpleSchema.RegEx.Email
    },
    "emails.$.verified": {
        type: Boolean
    },
    profile: {
        type: Schemas.UserProfile,
        optional: true
    }
});
//Meteor.users.attachSchema(Schemas.User);

//Meteor.users.allow({
//    //insert: function () { return true; },
//    update: function () { return true; },
//    //remove: function () { return true; }
//});
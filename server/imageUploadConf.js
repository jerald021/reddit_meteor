Slingshot.fileRestrictions("myImageUploads", {
    allowedFileTypes: ["image/png", "image/jpeg", "image/gif"],
    maxSize: 2 * 1024 * 1024
});

Slingshot.createDirective("myImageUploads", Slingshot.S3Storage, {
    AWSAccessKeyId: Meteor.settings.private.AWSAccessKeyId,
    AWSSecretAccessKey: Meteor.settings.private.AWSSecretAccessKey,
    bucket: Meteor.settings.private.bucket,
    acl: "public-read",
    region: Meteor.settings.private.region,

    authorize: function () {
        if (!this.userId) {
            var message = "Please login before posting images";
            throw new Meteor.Error("Login Required", message);
        }
        return true;
    },
    //key: function (file) {
    //    var currentUserId = Meteor.user().emails[0].address;
    //    return currentUserId + "/" + file.name;
    //}
    key: function (file) {
        return "img/" + file.name;
    }
});
var uploader = new ReactiveVar();
var currentUserId = Meteor.userId();

Template.imageUploader.helpers({
    isUploading: function () {
        return Boolean(uploader.get());
    },
    progress: function () {
        var upload = uploader.get();
        if (upload)
            return Math.round(upload.progress() * 100);
    },
    url: function () {
        return imageDetails.findOne({uploadedBy: currentUserId},{sort:{ time : -1 } });
    }
});

Template.imageUploader.events({'change .uploadFile': function(event, template) {
    event.preventDefault();
    var upload = new Slingshot.Upload("myImageUploads");
    var user = Meteor.user();
    var currentDate = new Date();

    upload.send(document.getElementById('file-5').files[0], function (error, downloadUrl) {
        uploader.set();
        if (error) {
            console.error('Error uploading');
            alert (error);
        }
        else{
            console.log("Success!");
            console.log('uploaded file available here: '+downloadUrl);
            imageDetails.insert({
                imageurl: downloadUrl,
                time: currentDate,
                uploadedBy: currentUserId,
                username: user.username
            });
            Meteor.users.update(currentUserId,
                {$set:{"profile.profPicture": downloadUrl}}
            );
        }
    });
    uploader.set(upload);
}
});
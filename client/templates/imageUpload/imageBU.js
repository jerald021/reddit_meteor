//var uploader = new Slingshot.Upload("myFileUploads");
//
//uploader.send(document.getElementById('input').files[0], function (error, downloadUrl) {
//    if (error) {
//        // Log service detailed response.
//        console.error('Error uploading', uploader.xhr.response);
//        alert (error);
//    }
//    else {
//        Meteor.users.update(Meteor.userId(), {$push: {"profile.files": downloadUrl}});
//    }
//});
//
//Template.progressBar.helpers({
//    progress: function () {
//        return Math.round(this.uploader.progress() * 100);
//    }
//});
//
//Template.myPicture.helpers({
//    url: function () {
//        //If we are uploading an image, pass true to download the image into cache.
//        //This will preload the image before using the remote image url.
//        return this.uploader.url(true);
//    }
//});
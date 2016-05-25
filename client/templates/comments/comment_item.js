Template.commentItem.helpers({
    submittedText: function() {
        return this.submitted.toString();
    },
    smallAvatar: function () {
        var user = Meteor.users.findOne({_id: this.userId});
        return user;
    }
});
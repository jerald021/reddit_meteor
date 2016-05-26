Template.commentItem.helpers({
    submittedText: function() {
        return this.submitted.toString();
    },
    smallAvatar: function () {
        var user = Meteor.users.findOne({_id: this.userId});
        return user;
    },
    upvotedClass: function() {
        var userId = Meteor.userId();
        if (userId && !_.include(this.upvoters, userId)) {
            return 'btn-primary upvotable';
        } else {
            return 'disabled';
        }
    }
});

Template.commentItem.events({
    'click .upvotable': function(e) {
        e.preventDefault();
        Meteor.call('upvoteComment', this._id);
    }
});
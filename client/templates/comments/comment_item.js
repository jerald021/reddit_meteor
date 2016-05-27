Template.commentItem.helpers({
    smallAvatar: function () {
        var user = Meteor.users.findOne({_id: this.userId});
        return user;
    },
    upVotedClass: function() {
        var userId = Meteor.userId();
        if (userId && !_.include(this.upVoters, userId)) {
            return 'btn-primary up-votable';
        }
        else {
            return 'disabled';
        }
    },
    downVotedClass: function() {
        var userId = Meteor.userId();
        if (userId && !_.include(this.downVoters, userId)) {
            return 'btn-primary down-votable';
        }
        else {
            return 'disabled';
        }
    },
});

Template.commentItem.events({
    'click .up-votable': function(e) {
        e.preventDefault();
        Meteor.call('voteComment', this._id, 1);
    },
    'click .down-votable': function(e) {
        e.preventDefault();
        Meteor.call('voteComment', this._id, -1);
    }
});
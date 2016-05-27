Template.postItem.helpers({
    domain: function() {
        var a = document.createElement('a');
        a.href = this.url;
        return a.hostname;
    },
    ownPost: function() {
        return this.userId === Meteor.userId();
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
    smallAvatar: function () {
        var user = Meteor.users.findOne({_id: this.userId});
        return user;
    }
});

Template.postItem.events({
    'click .up-votable': function(e) {
        e.preventDefault();
        Meteor.call('vote', this._id, 1);
    },
    'click .down-votable': function(e) {
        e.preventDefault();
        Meteor.call('vote', this._id, -1);
    }
});
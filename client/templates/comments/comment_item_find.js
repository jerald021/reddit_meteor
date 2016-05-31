Template.commentItemFind.helpers({
    smallAvatar: function () {
        var user = Meteor.users.findOne({_id: this.userId});
        return user;
    },
    ownComment: function() {
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
    //findPost: function(){
    //    var thisPost = Comments.findOne({postId: this.postId});
    //    return postId;
    //}
});

Template.commentItemFind.events({
    'click .up-votable': function(e) {
        e.preventDefault();
        Meteor.call('voteComment', this._id, 1);
    },
    'click .down-votable': function(e) {
        e.preventDefault();
        Meteor.call('voteComment', this._id, -1);
    },
    'click .findPost': function(e){
        e.preventDefault();
        var thisPost = Comments.findOne({postId: this.postId});
        //console.log(postId.postId);
        Router.go('postPage', {_id: thisPost.postId});
    }
});
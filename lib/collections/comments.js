Comments = new Mongo.Collection('comments');

Meteor.methods({
    commentInsert: function(commentAttributes) {
        check(this.userId, String);
        check(commentAttributes, {
            postId: String,
            body: String
        });
        var user = Meteor.user();
        var post = Posts.findOne(commentAttributes.postId);
        if (!post)
            throw new Meteor.Error('invalid-comment', 'You must comment on a post');
        comment = _.extend(commentAttributes, {
            userId: user._id,
            author: user.username,
            submitted: new Date(),
            upvoters: [],
            votes: 0
        });

        // update the post with the number of comments
        Posts.update(comment.postId, {$inc: {commentsCount: 1}});

        // create the comment, save the id
        comment._id = Comments.insert(comment);
        // now create a notification, informing the userLogin that there's been a comment
        createCommentNotification(comment);
        return comment._id;
    },

    upvoteComment: function(commentId) {
        check(this.userId, String);
        check(commentId, String);

        var affected = Comments.update({
            _id: commentId,
            upvoters: {$ne: this.userId}
        }, {
            $addToSet: {upvoters: this.userId},
            $inc: {votes: 1}
        });
        if (! affected)
            throw new Meteor.Error('invalid', "You weren't able to upvote that comment");
    }

});

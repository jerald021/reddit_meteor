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
            upVoters: [],
            downVoters: [],
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
    voteComment: function(postId, value) {
        check(this.userId, String);
        check(postId, String);
        check(value, Number);
        var affected;

        if(value == -1) {
            affected = Comments.update({
                    _id: postId,
                    downVoters: {$ne: this.userId}
                },
                {
                    $push: {
                        downVoters: this.userId
                    },
                    $pull:{
                        upVoters: (this.userId)
                    },
                    $inc: {votes: value}
                });
        }
        else if(value == 1){
            affected = Comments.update({
                    _id: postId,
                    upVoters: {$ne: this.userId}
                },
                {
                    $push: {
                        upVoters: this.userId
                    },
                    $pull:{
                        downVoters: (this.userId)
                    },
                    $inc: {votes: value}
                });
        }
        if (! affected)
            throw new Meteor.Error('invalid', "You weren't able to vote that post");
    }
});

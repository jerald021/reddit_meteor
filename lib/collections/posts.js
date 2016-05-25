Posts = new Mongo.Collection('posts');
var Schemas = {};

Schemas.Post = new SimpleSchema({
   title:{
       type:String,
       label: "Insert Title",
       max:100
   },
    url:{
        type:String,
        label: "Insert url",
        max:100
    },
    description:{
        type:String,
        label: "Insert description",
        optional: true,
        max:500
    }
});

//Posts.attachSchema(Schemas.Post);

Posts.allow({
    insert: function(userId, doc) {
        // only allow posting if you are logged in
        return !! userId;
    },
    update: function(userId, post) { return ownsDocument(userId, post); },
    remove: function(userId, post) { return ownsDocument(userId, post); },
});

Posts.deny({
    update: function(userId, post, fieldNames) {
        // may only edit the following two fields:
        return (_.without(fieldNames, 'url', 'title', 'description').length > 0);
    }
});

Meteor.methods({
    postInsert: function(postAttributes) {
        check(Meteor.userId(), String);
        check(postAttributes, {
            title: String,
            url: String,
            description: String
        });

        var postWithSameLink = Posts.findOne({url: postAttributes.url});
        if (postWithSameLink) {
            return {
                postExists: true,
                _id: postWithSameLink._id
            }
        }

        var user = Meteor.user();
        var post = _.extend(postAttributes, {
            userId: user._id,
            author: user.username,
            submitted: new Date(),
            commentsCount: 0,
            upvoters: [],
            votes: 0
        });
        var postId = Posts.insert(post);
        return {
            _id: postId
        };
    },

    upvote: function(postId) {
        check(this.userId, String);
        check(postId, String);

        var affected = Posts.update({
            _id: postId,
            upvoters: {$ne: this.userId}
        }, {
            $addToSet: {upvoters: this.userId},
            $inc: {votes: 1}
        });
        if (! affected)
            throw new Meteor.Error('invalid', "You weren't able to upvote that post");
    }
});
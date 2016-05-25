//Meteor.publish('posts', function(options) {
//    check(options, {
//        sort: Object,
//        limit: Number
//    });
//    return Posts.find({}, options);
//});
Meteor.publishComposite('posts', {
    find: function(options) {
        check(options, {
            sort: Object,
            limit: Number
        });
        return Posts.find({}, options);
    },
    children: [
        {
            find: function(post) {
                return Meteor.users.find(
                    { _id: post.userId },
                    { limit: 1, fields:
                        {profile: 1,
                         emails: 1,
                         roles: 1
                        }
                    }
                );
            }
        }
    ]
});
Meteor.publish('singlePost', function(id) {
    check(id, String);
    return Posts.find(id);
});
Meteor.publish('comments', function(postId) {
    check(postId, String);
    return Comments.find({postId: postId});
});
Meteor.publish('notifications', function() {
    return Notifications.find({userId: this.userId, read: false});
});
Meteor.publish('images', function () {
    return imageDetails.find();
});
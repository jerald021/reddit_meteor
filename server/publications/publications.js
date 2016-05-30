Meteor.publishComposite('users', function (username) {
        return {
            find: function () {
                return Meteor.users.find({username: username},
                    { limit: 1, fields:
                    { emails: 1,
                        profile: 1,
                        roles: 1,
                        username: 1
                    }
                    }
                );
            },
            children: [
                {
                    find: function(user) {
                        return Posts.find({author: user.username});
                    }
                },
                {
                    find: function(user) {
                        return Comments.find({author: user.username});
                    }

                }
            ]
        }
});

Meteor.publishComposite('posts', {
    find: function(options) {
        //check(options, {
        //    sort: Object,
        //    limit: Number
        //});
        return Posts.find({}, options);
    },
    children: [
        {
            find: function(post) {
                return Meteor.users.find(
                    { _id: post.userId },
                    { limit: 1, fields:
                        { emails: 1,
                          profile: 1,
                          roles: 1,
                          username: 1
                        }
                    }
                );
            }
        }
    ]
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
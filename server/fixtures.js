if (Posts.find().count() === 0) {
    var now = new Date().getTime();

    // create two users
    var tomId = Meteor.users.insert({
        profile: { name: 'Tom Coleman',
            profPicture: "https://s3-us-west-1.amazonaws.com/reddit-image-app2/img/default-user.png"
        }
    });
    var tom = Meteor.users.findOne(tomId);
    var sachaId = Meteor.users.insert({
        profile: { name: 'Sacha Greif',
            profPicture: "https://s3-us-west-1.amazonaws.com/reddit-image-app2/img/default-user.png"
        }
    });
    var sacha = Meteor.users.findOne(sachaId);

    var telescopeId = Posts.insert({
        title: 'Introducing Telescope',
        userId: sacha._id,
        author: sacha.profile.name,
        url: 'http://sachagreif.com/introducing-telescope/',
        submitted: new Date(now - 7 * 3600 * 1000),
        commentsCount: 2,
        upVoters: [],
        downVoters: [],
        votes: 0
    });

    Comments.insert({
        postId: telescopeId,
        userId: tom._id,
        author: tom.profile.name,
        submitted: new Date(now - 5 * 3600 * 1000),
        body: 'Interesting project Sacha, can I get involved?'
    });

    Comments.insert({
        postId: telescopeId,
        userId: sacha._id,
        author: sacha.profile.name,
        submitted: new Date(now - 3 * 3600 * 1000),
        body: 'You sure can Tom!'
    });

    Posts.insert({
        title: 'Meteor',
        userId: tom._id,
        author: tom.profile.name,
        url: 'http://meteor.com',
        submitted: new Date(now - 10 * 3600 * 1000),
        commentsCount: 0,
        upVoters: [],
        downVoters: [],
        votes: 0
    });

    Posts.insert({
        title: 'The Meteor Book',
        userId: tom._id,
        author: tom.profile.name,
        url: 'http://themeteorbook.com',
        submitted: new Date(now - 12 * 3600 * 1000),
        commentsCount: 0,
        upVoters: [],
        downVoters: [],
        votes: 0
    });

    for (var i = 0; i < 10; i++) {
        Posts.insert({
            title: 'Test post #' + i,
            author: sacha.profile.name,
            userId: sacha._id,
            url: 'http://google.com/?q=test-' + i,
            submitted: new Date(now - i * 3600 * 1000),
            commentsCount: 0,
            upVoters: [],
            downVoters: [],
            votes: 0
        });
    }
}
//var jerald021Id = Meteor.users.insert({
//    //"emails[0].address": 'jerald021@gmail.com',
//    emails: {address: 'jerald021@gmail.com'},
//    profile:{ profPicture: '"https://reddit-image-app2.s3-us-west-1.amazonaws.com/img/happy-dog.png"'},
//    roles: 'user',
//    username: 'jerald021'
//});
//var jerald021 = Meteor.users.findOne(jerald021Id);
//
//var jeraldbcnId = Meteor.users.insert({
//    //"emails[0].address": 'jeraldbcn@gmail.com',
//    emails: {address: 'jeraldbcn@gmail.com'},
//    profile:{ profPicture: Meteor.absoluteUrl() + "img/default-user.png"},
//    //profile:{ profPicture: 'http://localhost:3000/img/default-user.png'},
//    roles: 'user',
//    username: 'jeraldbcn'
//});
//var jeraldbcn = Meteor.users.findOne(jeraldbcnId);

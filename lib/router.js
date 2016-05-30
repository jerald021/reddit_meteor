Router.configure({
    layoutTemplate: 'layout',
    loadingTemplate: 'loading',
    notFoundTemplate: 'notFound',
    waitOn: function() {
        return [
            Meteor.subscribe('notifications')
        ];
    }
});

Router.route('/posts/:_id', {
    name: 'postPage',
    waitOn: function() {
        return [
            //Meteor.subscribe('singlePost', this.params._id),
            Meteor.subscribe('posts'),
            Meteor.subscribe('comments', this.params._id)
        ];
    },
    data: function() { return Posts.findOne(this.params._id); }
});

Router.route('/posts/:_id/edit', {
    name: 'postEdit',
    waitOn: function() {
        //return Meteor.subscribe('singlePost', this.params._id);
        return Meteor.subscribe('posts');
    },
    data: function() { return Posts.findOne(this.params._id); }
})

Router.route('/comments/:_id/edit', {
    name: 'commentEdit',
    waitOn: function() {
        //return Meteor.subscribe('singlePost', this.params._id);
        return Meteor.subscribe('comments', this.params._id);
    },
    data: function() { return Comments.findOne(this.params._id); }
});

Router.route('/submit', {name: 'postSubmit'});

Router.route('/search', {name:'searchMain'});

Router.route('/login', {name:'login'});

Router.route('/register', {name:'register'});

Router.route('/user-profile', {
    name:'userProfile',
    waitOn: function() {
        return Meteor.subscribe('images', this.params._id);
    }
});

//Router.route('/posts/:_id', {
//    name: 'postPage',
//    waitOn: function() {
//        return [
//            //Meteor.subscribe('singlePost', this.params._id),
//            Meteor.subscribe('posts'),
//            Meteor.subscribe('comments', this.params._id)
//        ];
//    },
//    data: function() { return Posts.findOne(this.params._id); }
//});

Router.route('/change-password', {name:'changePassword'});

Router.route('/user/:username', {
    name:'userFind',
    waitOn: function () {
        return Meteor.subscribe('users', this.params.username);
    },
    data: function() { return Meteor.users.findOne(this.params.username); }
});

//Router.route('/user/:_id', {
//    name:'userFind',
//    waitOn: function () {
//        return [
//            Meteor.subscribe('posts'),
//            Meteor.subscribe('users', this.params._id),
//            //Meteor.subscribe('comments')
//        ];
//    }
//});

//Router.route('/userLogin-edit-profile', {name:'UserProfileEdit'});

PostsListController = RouteController.extend({
    template: 'postsList',
    increment: 5,
    postsLimit: function() {
        return parseInt(this.params.postsLimit) || this.increment;
    },
    findOptions: function() {
        return {sort: this.sort, limit: this.postsLimit()};
    },
    subscriptions: function() {
        this.postsSub = Meteor.subscribe('posts', this.findOptions()); //agregado find options para usarlo en publications
    },
    posts: function() { // ????????????????????????
        return Posts.find({}, this.findOptions());
    },
    data: function() {
        var hasMore = this.posts().count() === this.postsLimit();
        return {
            posts: this.posts(),
            ready: this.postsSub.ready,
            nextPath: hasMore ? this.nextPath() : null
        };
    }
});
NewPostsController = PostsListController.extend({
    sort: {submitted: -1, _id: -1},
    nextPath: function() {
        return Router.routes.newPosts.path({postsLimit: this.postsLimit() + this.increment})
    }
});
BestPostsController = PostsListController.extend({
    sort: {votes: -1, submitted: -1, _id: -1},
    nextPath: function() {
        return Router.routes.bestPosts.path({postsLimit: this.postsLimit() + this.increment})
    }
});

Router.route('/', {
    name: 'home',
    controller: NewPostsController
});
Router.route('/new/:postsLimit?', {name: 'newPosts'});
Router.route('/best/:postsLimit?', {name: 'bestPosts'});

var requireLogin = function() {
    if (! Meteor.user()) {
        if (Meteor.loggingIn()) {
            this.render(this.loadingTemplate);
        } else {
            this.render('accessDenied');
        }
    } else {
        this.next();
    }
};

Router.onBeforeAction('dataNotFound', {only: 'postPage'});
Router.onBeforeAction(requireLogin, {only: 'postSubmit'});
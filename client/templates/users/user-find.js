Template.userFind.helpers({
    post: function () {
        var username = Router.current().params.username;
        return Posts.find({author: username});
    },
    comment: function(){
        var username = Router.current().params.username;
        return Comments.find({author: username});
    }
});
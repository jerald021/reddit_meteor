Template.postPage.onRendered(function(){
    Session.set('sort', 'dateNew');
});

Template.postPage.helpers({
    comments: function() {
        var sort;
        if(Session.get('sort') == 'dateNew'){
            sort = Comments.find({postId: this._id}, {sort: {submitted: -1} });
        }
        else if (Session.get('sort') == 'dateOld'){
            sort = Comments.find({postId: this._id}, {sort: {submitted: 1} });
        }
        else if (Session.get('sort') == 'votesInc'){
            sort = Comments.find({postId: this._id}, {sort: {votes: -1} });
        }
        else if (Session.get('sort') == 'votesDec'){
            sort = Comments.find({postId: this._id}, {sort: {votes: 1} });
        }
        return sort;
    }
});
Template.postPage.events({
   'click #sort-date': function(){
       if(Session.get('sort') == 'dateNew'){
           Session.set('sort', 'dateOld');
       }
       else {
           Session.set('sort', 'dateNew');
       }
   },
    'click #sort-vote': function(){
        if(Session.get('sort') == 'votesInc'){
            Session.set('sort', 'votesDec');
        }
        else {
            Session.set('sort', 'votesInc');
        }
    }
});
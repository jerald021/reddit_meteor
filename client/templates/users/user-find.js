Template.userFind.helpers({
    user: function () {
        return Meteor.users.findOne();
    }

});
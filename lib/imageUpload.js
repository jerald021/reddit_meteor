imageDetails = new Mongo.Collection('images');

imageDetails.allow({
    insert: function(userId, doc) {
        // only allow posting if you are logged in
        return !! userId;
    },
    update: function(userId, doc) {
        // only allow posting if you are logged in
        return !! userId;
    },
    remove: function(userId, doc) {
        // only allow posting if you are logged in
        return !! userId;
    }
});
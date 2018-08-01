var FriendSuggestion = function() {
    this.init = function() {
        localforage.getItem('userObject', function(err, value) {
            $.get('/mustache/friend-suggestion.mustache', function(template) {
                $("#friend-suggestion").html(Mustache.render(template, null));
            });
        });
    }
};

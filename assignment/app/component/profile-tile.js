var Profile = function() {
    this.init = function() {
        localforage.getItem('userObject', function(err, value) {
            $.get('/mustache/profile-tile.mustache', function(template) {
                $("#profile-tile").html(Mustache.render(template, value));
            });
        });
    }
};

var CoverPhoto = function() {
    this.init = function() {
        localforage.getItem('userObject', function(err, value) {
            $("#cover-photo").attr("src", value.userProfile.heroImage);
        });
    }
};

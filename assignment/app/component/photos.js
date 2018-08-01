var Photos = function() {
    this.init = function() {
        localforage.getItem('userObject', function(err, value) {
            $.get('/mustache/photos.mustache', function(template) {
                $("#dashboard-content").html(Mustache.render(template, value["photoCollection"]));
                $(".photo-thumbnail").on("click", showPhoto);
            });
        });
    }
    
    function showPhoto() {
        var imageURL = $(this).children().attr("src");
        $.get('/mustache/photo-modal.mustache', function(template) {
            $("#selected-photo").html(Mustache.render(template, {url: imageURL}));
        });
    }
};

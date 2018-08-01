var About = function() {
    this.init = function() {
        localforage.getItem('userObject', function(err, value) {
            $.get('/mustache/about.mustache', function(template) {
                $("#dashboard-content").html(Mustache.render(template, value));
                new BasicInfo().init();
                new WorkInfo().init();
            });
        });
    }
};

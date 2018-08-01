var Header = function() {
    this.init = function() {
        localforage.getItem('userObject', function(err, value) {
            $.get('/mustache/header.mustache', function(template) {
                if(value) {
                    var name = (value.userName).trim();
                    var spaceIndex = name.indexOf(" ");
                    value.userName = (spaceIndex > 0) ? name.substring(0, spaceIndex) : name;
                    $("#header").html(Mustache.render(template, value));
                    $("#logout").on("click", logout);
                } else {
                    $("#header").html(Mustache.render(template, {userName: false}));
                }
            });
        });
    }
    
    function logout() {
        localforage.clear().then(function() {
            new Login().init();
        }).catch(function(err) {
            console.log(err);
        });
    }
};

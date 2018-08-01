var Login = function() {
    var credentialUserName = "Piyush";
    var credentialPassword = "123456";

    this.init = function() {
        $.get('/mustache/login.mustache', function(template) {
            localforage.getItem('userObject', function(err, value) {
                if(value) {
                    new Dashboard().init();
                } else {
                    $(document).prop('title', "Newput | LOGIN" );
                    history.pushState({ page: "login" }, null, "/login");
                    new Header().init();
                    $("#app-root").html(Mustache.render(template, null));
                    $("#login").on("click", function(){
                        authenticate();
                    });
                }
            });
        });
    }

    function authenticate() {
        $("form[name='login']").validate( {
            rules: {
                username: {
                    required : true
                },
                password: {
                    required: true,
                    minlength: 5
                }
            },
            messages : {
                username : {
                    required : "Please enter username"
                },
                password : {
                    required : "Please enter password",
                    minlength: "Password must have atleast 5 chartacter"
                }
            },
            submitHandler: function(form) {
                var username = $('input[name="username"]').val();
                var password = $('input[name="password"]').val();

                if(username === credentialUserName && password === credentialPassword) {
                    goToNavigation();
                }
                else {
                    $(".invalid-attempt").show();
                }
            }
        });
    }

    function goToNavigation() {
        $.getJSON("/json/userData.json", function(userData) {
            localforage.setItem('userObject', userData).then(function () {
                new Dashboard().init();
            }).catch(function(err) {
                console.log(err);
            });
        });
    }
};

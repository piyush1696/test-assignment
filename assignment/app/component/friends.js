var Friends = function() {
    this.init = function() {
        localforage.getItem('userObject', function(err, value) {
            $.get('/mustache/friends.mustache', function(template) {
                var friendsList = value["friendList"];
                var rows = [];
                for(var i = 0; i < friendsList.length; i++) {
                    rows.push({columns: friendsList.splice(0, 2)});
                    if(friendsList.length == 1) {
                        rows.push({columns: friendsList.splice(0, 1)});
                    }
                }
                $("#dashboard-content").html(Mustache.render(template, {row: rows}));
                $(".button-follow").on("click", follow);
                $(".button-unfollow").on("click", unfollow);
            });
        });
    }

    function follow() {
        $(this).removeClass("btn-default button-follow").addClass("btn-primary button-unfollow").text("Following");
        $(".button-unfollow").on("click", unfollow);
        var userId = $(this).attr("data-info");
        localforage.getItem('userObject', function(err, value) {
            value.following += 1;
            for(var i = 0; i < value.friendList.length; i++) {
                if(value.friendList[i].userId == userId) {
                    value.friendList[i].following = true;
                    break;
                }
            }
            localforage.setItem('userObject', value).then(function (value) {
                new Profile().init();
                new FriendList().init();
            }).catch(function(err) {
                console.log(err);
            });
        });
    }
    
    function unfollow() {
        $(this).removeClass("btn-primary button-unfollow").addClass("btn-default button-follow").text("Follow");
        $(".button-follow").on("click", follow);
        var userId = $(this).attr("data-info");
        localforage.getItem('userObject', function(err, value) {
            value.following -= 1;
            for(var i = 0; i < value.friendList.length; i++) {
                if(value.friendList[i].userId == userId) {
                    value.friendList[i].following = false;
                    break;
                }
            }
            localforage.setItem('userObject', value).then(function (value) {
                new Profile().init();
                new FriendList().init();
            }).catch(function(err) {
                console.log(err);
            });
        });
    }
};

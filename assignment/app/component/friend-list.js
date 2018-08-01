var FriendList = function() {
    this.init = function() {
        localforage.getItem('userObject', function(err, value) {
            $.get('/mustache/friend-list.mustache', function(template) {
                var friendsList = value.friendList;
                var isEmptyList = true;
                for(var i = 0; i < friendsList.length; i++) {
                    if(friendsList[i].following) {
                        isEmptyList = false;
                        break;
                    }
                }
                $("#friend-list").html(Mustache.render(template, {data: value, isEmpty: isEmptyList}));
            });
        });
    }
};

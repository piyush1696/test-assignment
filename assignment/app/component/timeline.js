var Timeline = function() {
    this.init = function() {
        localforage.getItem('userObject', function(err, value) {
            $.get('/mustache/timeline.mustache', function(template) {
                $("#dashboard-content").html(Mustache.render(template, calculatePostDuration(value["timelineData"])));
                $("#new-post-btn").on("click", showPostModal);
            });
        });
    }

    function calculatePostDuration(value) {
        var displayPostTime = "";
        for(var i = 0; i < value.timeline.length; i++) {
            var postTime = new Date(value.timeline[i].post.timeStamp);
            var timeDuration = (new Date().getTime() - postTime);
            var day = Math.floor(timeDuration / (1000 * 60 * 60 * 24));
            if(day) {
                displayPostTime = day;
                displayPostTime += (day == 1) ? " day ago" : " days ago";
            } else {
                var hour = Math.floor(timeDuration / (1000 * 60 * 60))
                if(hour) {
                    displayPostTime = hour;
                    displayPostTime += (hour == 1) ? " hour ago" : " hours ago";
                } else {
                    var miniute = Math.floor(timeDuration / (1000 * 60))
                    if(miniute) {
                        displayPostTime = miniute;
                        displayPostTime += (miniute == 1) ? " miniute ago" : " miniutes ago";
                    } else {
                        var second = Math.floor(timeDuration / (1000));
                        displayPostTime = second + " seconds ago";
                    }
                }
            }
            value.timeline[i].post["duration"] = displayPostTime;
        }
        return value;
    }

    function showPostModal() {
        $.get('/mustache/post-modal.mustache', function(template) {
            $("#new-post-modal").html(Mustache.render(template, null));
            $("textarea[name='postDescription']").on("keyup", validateDescription);
            $("#add-post").on("click", addPost);
        });
    }

    function addPost() {
        $("form[name='new-post']").validate( {
            rules: {
                postTitle: {
                    required : {
                        depends: function() {
                            $(this).val($.trim($(this).val()));
                            return true;
                        }
                    }
                },
                postImage : {
                    required: false,
                    validateImageType: true
                },
                postDescription: {
                    maxlength: 260
                }
            },
            messages : {
                postTitle : {
                    required : "Please enter title"
                },
                postImage: {
                    validateImageType : "Please enter valid image url"
                },
                postDescription : {
                    maxlength: "Description should be almost 260 chartacter"
                }
            },
            submitHandler: function(form) {
                localforage.getItem('userObject', function(err, value) {
                    var newPost = {
                        "ownerImage": value.userProfile.profileImage,
                        "post": {
                            "heading": value.userName + " posted",
                            "timeStamp": new Date().getTime(),
                            "content": {
                                "title": ($("input[name='postTitle']").val()).trim(),
                                "image": ($("input[name='postImage']").val()).trim(),
                                "description": ($("textarea[name='postDescription']").val()).trim()
                            },
                            "like" : 0,
                            "comment" : 0
                        }
                    };
                    value.timelineData.timeline.push(newPost);
                    value.timelineData.timeline.sort(function(a, b) {
                        return b.post.timeStamp - a.post.timeStamp;
                    });
                    value.activities += 1;
                    localforage.setItem('userObject', value).then(function (value) {
                        $("#new-post-modal").modal('hide');
                        $("#new-post-modal").on("hidden.bs.modal", function () {
                            new Profile().init();
                            new Timeline().init();
                        })
                    }).catch(function(err) {
                        console.log(err);
                    });
                });

            }
        });
        $.validator.addMethod("validateImageType", function(value, element) {
            if(value.length > 0) {
                return (value.match(/\.(jpeg|jpg|gif|png)$/) != null);
            }
            return true;
        });
    }

    function validateDescription() {
        var textArea = $("textarea[name='postDescription']");
        $(".character-left").text(260 - textArea.val().length);
        if(textArea.val().length > 260) {
            $(".character-left").text(0);
            var input = textArea.val();
            textArea.val(input.substring(0, 260));
        }
    }
};

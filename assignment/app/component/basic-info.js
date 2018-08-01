var BasicInfo = function() {
    var editMode = false;
    this.init = function() {
        localforage.getItem('userObject', function(err, value) {
            $.get('/mustache/basic-info.mustache', function(template) {
                var originalDateFormat = value.personalDetail.dob;
                var dob = new Date(value.personalDetail.dob);
                value.personalDetail.dob = dob.toDateString();

                $("#basic-info").html(Mustache.render(template, {data: value, editView: editMode}));
                $(".edit-info").on("click", function() {
                    var data = value.personalDetail;
                    data['maleChecked'] = data.gender == "Male";
                    data['femaleChecked'] = data.gender == "Female";

                    data["singleSelected"] = data.martailStatus == "Single";
                    data["marriedSelected"] = data.martailStatus == "Married";

                    value.personalDetail.dob = originalDateFormat;

                    $("#basic-info").html(Mustache.render(template, {data: value, editView: !editMode}));
                    $(".save-info").on("click", saveInfo);
                    $(".close-info, .edit-info").on("click", function() {
                        new BasicInfo().init();
                    });
                });
            });
        });
    }

    function saveInfo() {
        $("form[name='basic-info']").validate( {
            rules: {
                fullname: {
                    required : true
                }
            },
            messages : {
                fullname : {
                    required : "Please enter name"
                }
            },
            submitHandler: function(form) {
                localforage.getItem('userObject', function(err, value) {
                    value.userName = $("input[name='fullname']").val();
                    value.personalDetail.gender = $("input[name='gender']:checked").val();
                    value.personalDetail.dob = $("input[name='dob']").val();
                    value.personalDetail.martailStatus = $( "select[name='status'] option:selected").val();
                    value.personalDetail.location = $("textarea[name='location']").val();

                    localforage.setItem('userObject', value).then(function (value) {
                        new Header().init();
                        new Profile().init();
                        new BasicInfo().init();
                    }).catch(function(err) {
                        console.log(err);
                    });
                });
            }
        });
    }
};

var WorkInfo = function() {
    var editMode = false;
    this.init = function() {
        localforage.getItem('userObject', function(err, value) {
            $.get('/mustache/work.mustache', function(template) {
                $("#work").html(Mustache.render(template, {data: value, editView: editMode}));
                $(".edit-work").on("click", function() {
                    $("#work").html(Mustache.render(template, {data: value, editView: !editMode}));
                    $(".save-work").on("click", saveWork);
                    $(".close-work, .edit-work").on("click", function() {
                        new WorkInfo().init();
                    });
                });
            });
        });
    }
    function saveWork() {
        localforage.getItem('userObject', function(err, value) {
            value.userDesignation = $("input[name='designation']").val();
            value.personalDetail.skills = $("input[name='skills']").val();
            value.personalDetail.job = $("input[name='job']").val();

            localforage.setItem('userObject', value).then(function (value) {
                new WorkInfo().init();
                new Profile().init();
            }).catch(function(err) {
                console.log(err);
            });
        });
    }

};

var Dashboard = function() {
    var selectedPage = "";
    this.init = function() {
        $.get('/mustache/dashboard.mustache', function(template) {
            new Header().init();
            new CoverPhoto().init();
            new Profile().init();
            new FriendSuggestion().init();
            new FriendList().init();
            $("#app-root").html(Mustache.render(template, null));
            dashboardNavigation();
            $(".tab-item").on("click", dashboardNavigation);
            $(window).resize(function() {
                if($(window).width() <= 480) {
                    $("#dashboard-header .tab-item").attr("data-toggle", "collapse").attr("data-target",".navbar-collapse");
                } else {
                    $("#dashboard-header .tab-item").removeAttr("data-toggle data-target");
                }
            });
        });
    }

    function dashboardNavigation() {
        var pageName = $(this).children().text().toLowerCase();
        if(!pageName) {
            pageName = "timeline";
        }
        if(selectedPage != pageName) {
            selectedPage = pageName;
            switchToPage(pageName);
        }
    }
};

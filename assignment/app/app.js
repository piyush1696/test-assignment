$(document).ready(function() {
    new Login().init();
});

$(window).on('popstate', function(event) {
    var state = history.state;
    if (state) {
        switch(state.page) {
            case "login" : new Login().init();
                            break;
            case "timeline" : switchToPage("timeline");
                              break;
            case "about" :  switchToPage("about");
                            break;
            case "photos" : switchToPage("photos");
                            break;
            case "friends" : switchToPage("friends");
                             break;
        }
    }
    else {
        new Login().init();
    }
});

function switchToPage(pageName) {
    if($(window).width() <= 480) {
        $(".dashboard-title").text(pageName.toUpperCase());
        $(".dashboard-title").on("click", function(event) {
            event.preventDefault();
        });
    }
    $("#dashboard-header ul li").attr("class", "tab-item");
    var selectedTab = 0;
    switch(pageName) {
        case "timeline": new Timeline().init();
                         selectedTab = 0;
                         break;
        case "about":   new About().init();
                        selectedTab = 1;
                        break;
        case "photos":  new Photos().init();
                        selectedTab = 2;
                        break;
        case "friends": new Friends().init();
                        selectedTab = 3;
                        break;
    }
    if(history.state == null || history.state.page != pageName) {
        history.pushState({ page: pageName }, null, "/" + pageName);
    }
    $("#dashboard-header ul li").eq(selectedTab).addClass("active");
    $(document).prop('title', "Newput | " + pageName.toUpperCase());
}

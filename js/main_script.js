$(document).ready(function () {
    enableSmoothScrolling();
    initNavbar();

    // scroll to #link on page load
    if (window.location.hash) {
        scrollTo(window.location.hash);
    }
});
function scrollTo(hash) {
    var stickyNavHeight = 0;
    if ($(hash).length > 0) {
        if ($('.navbar-menu').length > 0) {
            stickyNavHeight = $('.navbar-menu').height();
        }
        $('html, body').animate({
            scrollTop: $(hash).offset().top - stickyNavHeight
        }, 500, function () {

            // Add hash (#) to URL when done scrolling
            //window.location.hash = hash;
        });
    }
}

function initNavbar() {
    var hidden = true;
    $(".nav-hamburger").on("click", function () {
        $(this).toggleClass('change');
        var el = $(".nav-menu-options");
        if (hidden === true) {
            el.slideDown("slow");
            hidden = false;
        } else {
            el.slideUp("slow");
            hidden = true;
        }
    });

    // make 2nd navbar sticky when scroll down in desktop
    if ($('.navbar-2 .nav-homepage').is(":visible")) {
        var navbar = $(".navbar-menu");
        navbar.css('position','static')
        var navHeight = navbar.height();
        stickNavbar(navHeight, navbar)
        window.onscroll = function () { stickNavbar(navHeight, navbar) };
    }
}
function stickNavbar(navHeight, navbar) {
    if ($('.navbar-2 .nav-homepage').is(":visible")) {
        var nav2 = $('.navbar-2');
        if (window.pageYOffset >= navHeight) {

            nav2.removeClass("nav-2-un-sticky");
            nav2.addClass("nav-2-sticky");
            
        } else {
            nav2.removeClass("nav-2-sticky");
            nav2.addClass("nav-2-un-sticky");
        }
    }
}
function enableSmoothScrolling() {
    // Add smooth scrolling to all links
    $("a").on('click', function (event) {
        if (this.hash !== "") {
            event.preventDefault();
            scrollTo(this.hash);
        }
    });
}


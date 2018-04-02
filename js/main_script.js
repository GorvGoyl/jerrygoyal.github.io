$(document).ready(function () {
    enableSmoothScrolling();
    initNavbar();
    if (window.location.hash) {
        scrollTo(window.location.hash);
    }
});
function scrollTo(hash) {
    var stickyNavHeight = 0;
    if($(hash).length>0){
        if ($('#myTopnav').length > 0) {
            stickyNavHeight = $('#myTopnav').height();
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
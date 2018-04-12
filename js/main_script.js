$(document).ready(function () {
    enableSmoothScrolling();
    initNavbar();

    // scroll to #link on page load
    if (window.location.hash) {
        scrollTo(window.location.hash);
    }

        var typewrite_cl = '.typewrite';
    if($(typewrite_cl).length>0){
        animateTypewrite(typewrite_cl);
    }
});
var TxtType = function(el, toRotate, period) {
    this.toRotate = toRotate;
    this.el = el;
    this.loopNum = 0;
    this.period = parseInt(period, 10) || 2000;
    this.txt = '';
    this.tick();
    this.isDeleting = false;
};

TxtType.prototype.tick = function() {
    var i = this.loopNum % this.toRotate.length;
    var fullTxt = this.toRotate[i];

    if (this.isDeleting) {
    this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
    this.txt = fullTxt.substring(0, this.txt.length + 1);
    }

    this.el.innerHTML = '<span class="wrap">'+this.txt+'</span>';

    var that = this;
    var delta = 200 - Math.random() * 100;

    if (this.isDeleting) { delta /= 3; }

    if (!this.isDeleting && this.txt === fullTxt) {
    delta = this.period;
    this.isDeleting = true;
    } else if (this.isDeleting && this.txt === '') {
    this.isDeleting = false;
    this.loopNum++;
    delta = 500;
    }

    setTimeout(function() {
    that.tick();
    }, delta);
};
function animateTypewrite(typewrite_cl){
    var elements = $(typewrite_cl);
    for (var i=0; i<elements.length; i++) {
        var toRotate = elements[i].getAttribute('data-type');
        var period = elements[i].getAttribute('data-period');
        if (toRotate) {
          new TxtType(elements[i], JSON.parse(toRotate), period);
        }
    }
}
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


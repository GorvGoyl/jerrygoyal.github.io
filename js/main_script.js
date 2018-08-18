/* [alias : jerrygoyal] */

"use strict";

/************************************************\
       *  DOC READY  *
\************************************************/
var jgMainIns;

$(document).ready(function () {
    jgMainIns = jgMainIns || new jgMainClass();
    jgMainIns.init();
});

/************************************************\
       *  MAIN CLASS  *
\************************************************/


var jgMainClass = function () {

    //**** Variables declaration ****\\
    var self = this;
    var isMobile = $(".nav-menu-select").is(":visible");
    var navbarBG_cl = 'navbar-bg';
    var navbarEl = $('.navbar-bg-toggle');
    var makeNavBGVisible = false;

    self.init = function () {
        // enable smooth scrolling for #links
        enableSmoothScrolling();

        //navbar
        initNavbar();

        // scroll to #link on page load
        if (window.location.hash) {
            scrollTo(window.location.hash);
        }

        initTypewriter_AboutPage();

        //handle scroll events
        // fade in out navbar on scroll
        handleScrollEvents();
    };

    /************************************************\
           *  ENABLE SMOOTH SCROLLING FOR #LINKS  *
    \************************************************/

    function enableSmoothScrolling() {
        // Add smooth scrolling to all links
        $("a").on('click', function (event) {
            if (this.hash !== "") {
                event.preventDefault();
                scrollTo(this.hash);
            }
        });
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

    /************************************************\
           *  TYPEWRITER EFFECTS  *
    \************************************************/

    var TxtType = function (el, toRotate, period) {
        this.toRotate = toRotate;
        this.el = el;
        this.loopNum = 0;
        this.period = parseInt(period, 10) || 2000;
        this.txt = '';
        this.tick();
        this.isDeleting = false;
    };

    TxtType.prototype.tick = function () {
        var i = this.loopNum % this.toRotate.length;
        var fullTxt = this.toRotate[i];

        if (this.isDeleting) {
            this.txt = fullTxt.substring(0, this.txt.length - 1);
        } else {
            this.txt = fullTxt.substring(0, this.txt.length + 1);
        }

        this.el.innerHTML = '<span class="wrap">' + this.txt + '</span>';

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

        setTimeout(function () {
            that.tick();
        }, delta);
    };

    function initTypewriter_AboutPage() {
        // init typewriter for about page only
        var typewrite_cl = '.typewrite';
        if ($(typewrite_cl).length > 0) {
            animateTypewrite(typewrite_cl);
        }
    }

    function animateTypewrite(typewrite_cl) {
        var elements = $(typewrite_cl);
        for (var i = 0; i < elements.length; i++) {
            var toRotate = elements[i].getAttribute('data-type');
            var period = elements[i].getAttribute('data-period');
            if (toRotate) {
                new TxtType(elements[i], JSON.parse(toRotate), period);
            }
        }
    }

    /************************************************\
           *  NAVBAR  *
    \************************************************/

    function handleScrollEvents() {
        var introHeaderHeight = $(".intro").outerHeight();
        var navbarHeight = $(".nav-menu-options").height();
        var prevScroll = 0;
        $(window).scroll(function () {
            var curScroll = window.pageYOffset || document.documentElement.scrollTop;

            //1. remove bg from navbar when top of page
            //2. hide navbar when scroll down, show when scroll-up
            fadeInOutNavOnScroll(introHeaderHeight, navbarHeight, navbarEl, curScroll, prevScroll, isMobile);
            prevScroll = curScroll <= 0 ? 0 : curScroll; // For Mobile or negative scrolling
        });
    }

    //1. remove bg from navbar when top of page
    //2. hide navbar when scroll down, show when scroll-up
    function fadeInOutNavOnScroll(introHeaderHeight, navbarHeight, navbarEl, curScroll, prevScroll, isMobile) {

        makeNavBGVisible = $(window).scrollTop() > (introHeaderHeight - navbarHeight);
        if (makeNavBGVisible) {



            // hide & show nav on scroll
            if (curScroll > prevScroll) {
                // downscroll
                navbarEl[0].style.top = "-" + navbarHeight + "px";
            } else {
                // upscroll
                navbarEl[0].style.top = 0;

                //add BG
                NavbarBG_Show();
            }

        } else {
            //hide BG when on page top
            NavbarBG_Hide();

            navbarEl[0].style.top = 0;

        };
    }

    //**** Hamburger click ****\\
    function initNavbar() {
        //old code
        var hidden = true;
        $(".nav-hamburger").on("click", function () {
            $(this).toggleClass('change');
            var el = $(".nav-menu-options");
            if (hidden === true) {
                // expand navbar
                //add BG
                NavbarBG_Show();

                el.slideDown("slow");
                hidden = false;
            } else {
                // collapse navbar
                el.slideUp("slow", function () {
                    if (makeNavBGVisible) {
                        NavbarBG_Show();
                    } else {
                        NavbarBG_Hide();
                    }
                });
                hidden = true;

            }
        });

        // make 2nd navbar sticky when scroll down in desktop
        if ($('.navbar-2 .nav-homepage').is(":visible")) {
            var navbar = $(".navbar-menu");
            navbar.css('position', 'static')
            var navHeight = navbar.height();
            stickNavbar(navHeight, navbar)
            window.onscroll = function () { stickNavbar(navHeight, navbar) };
        }

        //old code end
    }

    function NavbarBG_Hide() {
        navbarEl.each(function () {
            $(this).removeClass(navbarBG_cl);
        });
    }

    function NavbarBG_Show() {
        navbarEl.each(function () {
            $(this).addClass(navbarBG_cl);
        });
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
};


/* I welcome new opportunities at: 1gouravgg@gmail.com */
/* [alias : jerrygoyal] */

"use strict";

/************************************************\
       *  DOC READY  *
\************************************************/
var jgMainIns;

$(document).ready(function () {
  jgMainIns = jgMainIns || new jgMainClass();
  jgMainIns.init();
  // mixpanel.track("Video play");
});

/************************************************\
       *  MAIN CLASS  *
\************************************************/

var jgMainClass = function () {
  //**** Variables declaration after doc ready ****\\
  var self = this;
  var isMobile = $(".nav-menu-select").is(":visible");
  var navbarBG_cl = "navbar-bg";
  var navbarEl = $(".navbar-menu");
  var navbarToggleEl = $(".navbar-bg-toggle");
  var makeNavBGVisible = false;
  var navbarMenuEl = $(".nav-menu-options");
  var hamburgerEl = $(".nav-hamburger");
  var introHeaderHeight = $(".intro").outerHeight();

  //calculate box-shadow and add it to navbar total height
  var navBoxShadow = 6;
  var navbarHeight = navbarEl.height() + navBoxShadow;
  var isHamburgerCollapsed = true;

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

    console.log("site so good, I would do the same ♥");
  };

  /************************************************\
           *  ENABLE SMOOTH SCROLLING FOR #LINKS  *
    \************************************************/

  //clicking on local hyperlinks will scroll the page to the link address
  function enableSmoothScrolling() {
    // Add smooth scrolling to all links
    $("a").on("click", function (event) {
      if (this.hash !== "") {
        // event.preventDefault();
        scrollTo(this.hash);
      }
    });
  }

  function scrollTo(hash) {
    var stickyNavHeight = 0;
    if ($(hash).length > 0) {
      // if ($('.navbar-menu').length > 0) {
      //     stickyNavHeight = $('.navbar-menu').height();
      // }
      $("html, body").animate(
        {
          scrollTop: $(hash).offset().top - stickyNavHeight,
        },
        500,
        function () {
          // Add hash (#) to URL when done scrolling
          //window.location.hash = hash;
        }
      );
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
    this.txt = "";
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

    this.el.innerHTML = '<span class="wrap">' + this.txt + "</span>";

    var that = this;
    var delta = 200 - Math.random() * 100;

    if (this.isDeleting) {
      delta /= 3;
    }

    if (!this.isDeleting && this.txt === fullTxt) {
      delta = this.period;
      this.isDeleting = true;
    } else if (this.isDeleting && this.txt === "") {
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
    var typewrite_cl = ".typewrite";
    if ($(typewrite_cl).length > 0) {
      animateTypewrite(typewrite_cl);
    }
  }

  function animateTypewrite(typewrite_cl) {
    var elements = $(typewrite_cl);
    for (var i = 0; i < elements.length; i++) {
      var toRotate = elements[i].getAttribute("data-type");
      var period = elements[i].getAttribute("data-period");
      if (toRotate) {
        new TxtType(elements[i], JSON.parse(toRotate), period);
      }
    }
  }

  /************************************************\
           *  NAVBAR  *
    \************************************************/

  function handleScrollEvents() {
    var prevScroll = 0;
    var curScroll = 0;
    //set navbar on doc ready
    //1. remove bg from navbar when top of page
    //2. hide navbar when scroll down, show when scroll-up
    fadeInOutNavOnScroll(curScroll, prevScroll);

    // set navbar whenever mouse scrolls
    $(window).scroll(function () {
      curScroll = window.pageYOffset || document.documentElement.scrollTop;
      fadeInOutNavOnScroll(curScroll, prevScroll);
      prevScroll = curScroll <= 0 ? 0 : curScroll; // For Mobile or negative scrolling

      if (!isHamburgerCollapsed) {
        toggleHamburger();
      }
    });
  }

  //1. remove bg from navbar when top of page
  //2. hide navbar when scroll down, show when scroll-up
  function fadeInOutNavOnScroll(curScroll, prevScroll) {
    makeNavBGVisible = $(window).scrollTop() > introHeaderHeight - navbarHeight;
    var showNavbar = curScroll <= prevScroll || !makeNavBGVisible;
    // upscroll or page on intro div so show navbar
    if (showNavbar) {
      if (makeNavBGVisible) {
        //add BG if upscrolling and not on intro div
        NavbarBG_Show();
      } else {
        //hide BG when on page top
        NavbarBG_Hide();
      }
      // show navbar
      navbarToggleEl[0].style.top = 0;
    } else {
      // downscroll and not on intro div so hide navbar
      navbarToggleEl[0].style.top = "-" + navbarHeight + "px";
    }
  }

  function NavbarBG_Hide() {
    navbarToggleEl.each(function () {
      $(this).removeClass(navbarBG_cl);
    });
  }

  function NavbarBG_Show() {
    navbarToggleEl.each(function () {
      $(this).addClass(navbarBG_cl);
    });
  }

  //**** Hamburger click for mobile navbar ****\\
  function initNavbar() {
    // mobile navbar
    hamburgerEl.on("click", function () {
      toggleHamburger();
    });

    // below is the 2nd navbar for flash clipboard page
    // make 2nd navbar sticky when scroll down in desktop
    if ($(".navbar-2 .nav-homepage").is(":visible")) {
      var navbar = $(".navbar-menu");
      navbar.css("position", "static");
      var navHeight = navbar.height();
      stickNavbar(navHeight, navbar);
      window.onscroll = function () {
        stickNavbar(navHeight, navbar);
      };
    }
  }

  //toggle hamburger
  function toggleHamburger() {
    hamburgerEl.toggleClass("change");
    if (isHamburgerCollapsed === true) {
      // expand navbar
      //add BG
      NavbarBG_Show();

      navbarMenuEl.slideDown("slow");
      isHamburgerCollapsed = false;
    } else {
      // collapse navbar
      navbarMenuEl.slideUp("slow", function () {
        if (makeNavBGVisible) {
          NavbarBG_Show();
        } else {
          NavbarBG_Hide();
        }
      });
      isHamburgerCollapsed = true;
    }
  }

  // collapse the hamburger menu
  function collapseHamburger() {}

  // expand the hamburger menu
  function expandHamburger() {}
  // it's for 2nd navbar for flash clipboard page
  function stickNavbar(navHeight, navbar) {
    if ($(".navbar-2 .nav-homepage").is(":visible")) {
      var nav2 = $(".navbar-2");
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

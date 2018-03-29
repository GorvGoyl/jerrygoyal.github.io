$(document).ready(function () {
    enableSmoothScrolling();
    initNavbar();
    if (window.location.hash) {
        scrollTo(window.location.hash);
    }
});
function scrollTo(hash) {
    var stickyNavHeight = 0;
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
function toggleNav() {
    var navEl = document.getElementById("myTopnav");
    var dwEl = $('.downloaddiv');
    if (navEl.className === "topnav") {
        // $("#myTopnav").hide();
        // $("#myTopnav").slideToggle("slow");
        navEl.className += " responsive";
       
        dwEl.removeClass('topmargin')
    } else {
        
        navEl.className = "topnav";
        dwEl.addClass('topmargin')
        // $("#myTopnav").slideToggle("slow");
    }
}

function initNavbar(){
    // 0 = hide, 1 = visible
  var menuState = 0;
  //if($(".mini-menu-options").is(":hidden")) {
    /* Add a Click event listener to btn-select */
    $(".nav-hamburger").on("click",function() {
        // $(".navbar-menu").toggleClass('nav-border-bottom');
      if(menuState === 0) {
        $(".nav-menu-options").slideDown("slow");
        menuState = 1;
      } else {
        $(".nav-menu-options").slideUp("slow");
        menuState = 0;
      }
    });
  //}
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
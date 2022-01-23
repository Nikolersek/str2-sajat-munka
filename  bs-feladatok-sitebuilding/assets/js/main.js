(function($) {
    "use strict";

    $('a.scroll[href*="#"]:not([href="#"])').click(function() {
        if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
            if (target.length) {
                $('html, body').animate({
                    scrollTop: (target.offset().top - 48)
                }, 1000);
                return false;
            }
        }
    });

    $('.scroll').click(function() {
        $('.navbar-collapse').collapse('hide');
    });

    $('body').scrollspy({
        target: '#nav',
        offset: 54
    });

    var navbarCollapse = function() {
        if ($("#nav").offset().top > 100) {
            $("#nav").addClass("navbar-shrink");
        } else {
            $("#nav").removeClass("navbar-shrink");
        }
    };

    navbarCollapse();
    $(window).scroll(navbarCollapse);

    $('[data-toggle="tooltip"]').tooltip();

})(jQuery);
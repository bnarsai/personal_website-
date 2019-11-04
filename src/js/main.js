$(document).ready(function() {
    // Remove no-js class if js is enabled
    $('body').removeClass('no-js');


    // Hide Header on on scroll down
    // (https://jsfiddle.net/mariusc23/s6mLJ/31/)
    var didScroll;
    var lastScrollTop = 0;
    var delta = 5;
    var navbarHeight = $('.main-header__block').outerHeight();

    $(window).scroll(function(event){
        didScroll = true;
    });

    setInterval(function() {
        if (didScroll) {
            hasScrolled();
            didScroll = false;
        }
    }, 250);

    function hasScrolled() {
        var st = $(this).scrollTop();

        // Make sure they scroll more than delta
        if(Math.abs(lastScrollTop - st) <= delta)
            return;

        // If they scrolled down and are past the navbar, add class .nav-up.
        // This is necessary so you never see what is "behind" the navbar.
        if (st > lastScrollTop && st > navbarHeight){
            // Scroll Down
            $('.main-header__block').addClass('hidden');
            $('.main-header__nav-btn').removeClass('active');
            $('.main-header__nav').removeClass('active');
        } else {
            // Scroll Up
            if(st + $(window).height() < $(document).height()) {
                // Check if nav item has not been clicked (solves issue where nav still shows after clicking nav)
                if(!$('.main-header__nav a').data('clicked')) {
                    $('.main-header__block').removeClass('hidden');
                }
            }
        }
        // Remove data store after being set on the click event below
        $('.main-header__nav a').data('clicked', false);

        lastScrollTop = st;
    }

    // Custom code for body padding
    $('body').css('padding-top', $('.main-header__block').outerHeight());



    // Menu
    $('.main-header__nav-btn').click(function(e) {
        e.preventDefault();

        $(this).toggleClass('active');
        $('.main-header__nav').toggleClass('active');
    });

    $('.main-header__nav a').click(function(e) {
        e.preventDefault();

        // Scroll to element
        $([document.documentElement, document.body]).animate({
            scrollTop: $($(this).attr('href')).offset().top
        }, 400, function() {
            $('.main-header__block').addClass('hidden');
            $('.main-header__nav-btn').removeClass('active');
            $('.main-header__nav').removeClass('active');
            $('.main-header__nav a').data('clicked', true);
        });
    });

    // Logo scrollTop
    $('.main-header__logo').click(function(e) {
        e.preventDefault();

        $([document.documentElement, document.body]).animate({
            scrollTop: 0
        }, 400);
    });


});
// End of document.ready

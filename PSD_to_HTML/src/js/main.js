(function($) { // Begin jQuery
    $(function() { // DOM ready
        // Toggle open and close nav styles on click
        $('#nav-toggle').click(function() {
            $('nav ul').slideToggle();
        });
        // Hamburger to X toggle
        $('#nav-toggle').on('click', function() {
            this.classList.toggle('active');
        });
    }); // end DOM ready
})(jQuery); // end jQuery

// change color of navigation after scrolling
$(document).scroll(function () {
    var $nav = $(".navigation");
    $nav.toggleClass('scrolled', $(this).scrollTop() > $nav.height());
});

//Mobile carousel
$(document).ready(function(){
    $('.slider1').bxSlider({
        slideWidth: 600,
        minSlides: 1,
        maxSlides: 1,
        slideMargin: 50
    });

    $('.slider2').bxSlider({
        slideWidth: 800,
        minSlides: 1,
        maxSlides: 1,
        slideMargin: 50
    });

    //Smooth scroll
    $('a[href^="#"]').on('click', function (e) {
        e.preventDefault();

        var target = this.hash,
            $target = $(target);

        $('html, body').stop().animate({
            'scrollTop': $target.offset().top - 80
        }, 900, 'swing', function () {
            window.location.hash = target;
        });
    });

    // Gallery preview
    $(".fancybox")
        .attr('rel', 'gallery')
        .fancybox({
        padding : 0
    });

    // Close nav list and hamburger after click on mobile link
    // Remove and add class "active-link" to menu item
    $(".nav-list li a").click(function(event){
        $("li a").removeClass("active-link");
        $(this).addClass("active-link");
    });
});
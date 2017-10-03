// Agency Theme JavaScript

(function($) {
    "use strict"; // Start of use strict

    // jQuery for page scrolling feature - requires jQuery Easing plugin
    $('a.page-scroll').bind('click', function(event) {
        var $anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: ($($anchor.attr('href')).offset().top - 50)
        }, 1250, 'easeInOutExpo');
        event.preventDefault();
    });

    // Highlight the top nav as scrolling occurs
    $('body').scrollspy({
        target: '.navbar-fixed-top',
        offset: 51
    });

    // Closes the Responsive Menu on Menu Item Click
    $('.navbar-collapse ul li a').click(function(){ 
        $('.navbar-toggle:visible').click();
    });

    // Offset for Main Navigation
    $('#mainNav').affix({
        offset: {
            top: 100
        }
    })

})(jQuery); // End of use strict

$(function () {
    "use strict";
    $('.template-item').slice(0, 4).show("slow");
    $('#loadmore').on('click', function (e) {
        e.preventDefault();
        $('.template-item:hidden').slice(0, 4).slideDown();
        if ($('.template-item:hidden').length === 0) {
            $('#loadmore').replaceWith("<p class='p'></p>");
        }
    });
    $('#top').on('click', function (e) {
        e.preventDefault();
        $('html, body').animate({
            scrollTop: 0
        }, 600);
        return false;
    });
    $(window).scroll(function () {
        if ($(this).scrollTop() > 50) {
            $('#top a').fadeIn();
        } else {
            $('#top a').fadeOut();
        }
    });
    $(document).ready(function(){
        $(".info").click(function(){
            $("#exampleSelect1>option:eq(" + $(this).attr("option-id") + ")").prop('selected', true);
        });
    });

    $('.overlay').hover(function(){
        $('.info').delay(500).fadeIn("slow");
    });

    $('.overlay').mouseleave(function(){
        $('.info').hide();
    });

});

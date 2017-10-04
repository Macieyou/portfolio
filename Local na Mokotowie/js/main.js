/** 
 * ===================================================================
 * Main js
 *
 * ------------------------------------------------------------------- 
 */ 

(function($) {

    "use strict";

    /* --------------------------------------------------- */
    /* Preloader
	------------------------------------------------------ */ 
    $(window).load(function() {
        // will first fade out the loading animation 
        $("#loader").fadeOut("slow", function(){

            // will fade out the whole DIV that covers the website.
            $("#preloader").delay(300).fadeOut("slow");

        }); 
    })


    /*---------------------------------------------------- */
    /* FitVids
	------------------------------------------------------ */ 
    $(".fluid-video-wrapper").fitVids();


    /* --------------------------------------------------- */
    /*  Vegas Slideshow
	------------------------------------------------------ */
    $(".home-slides").vegas({
        transition: 'fade',
        transitionDuration: 2500,
        delay: 5000,
        slides: [
            { src: "images/slides/03.jpg" },
            { src: "images/slides/02.jpg" },
            { src: "images/slides/01.jpg" }
        ]
    });


    /* --------------------------------------------------- */
    /*  Particle JS
	------------------------------------------------------ */
    //    $('.home-particles').particleground({
    //        dotColor: '#fff',
    //        lineColor: '#555555',
    //        particleRadius: 6,
    //        curveLines: true,
    //        density: 10000,
    //        proximity: 110
    //    }); 


    /*-----------------------------------------------------*/
    /* tabs
  	-------------------------------------------------------*/	
    $(".tab-content").hide();
    $(".tab-content").first().show();

    $("ul.tabs li").click(function () {
        $("ul.tabs li").removeClass("active");
        $(this).addClass("active");
        $(".tab-content").hide();
        var activeTab = $(this).attr("data-id");
        $("#" + activeTab).fadeIn(700);
    });


    /*----------------------------------------------------*/
    /* Smooth Scrolling
  	------------------------------------------------------*/
    $('.smoothscroll').on('click', function (e) {

        e.preventDefault();

        var target = this.hash,
            $target = $(target);

        $('html, body').stop().animate({
            'scrollTop': $target.offset().top
        }, 800, 'swing', function () {
            window.location.hash = target;
        });

    });


    /* --------------------------------------------------- */
    /*  Placeholder Plugin Settings
	------------------------------------------------------ */
    $('input, textarea, select').placeholder()  


    /*---------------------------------------------------- */
    /* ajaxchimp
	------------------------------------------------------ */

    // Example MailChimp url: http://xxx.xxx.list-manage.com/subscribe/post?u=xxx&id=xxx
    var mailChimpURL = 'http://facebook.us8.list-manage.com/subscribe/post?u=cdb7b577e41181934ed6a6a44&amp;id=e65110b38d'

    $('#mc-form').ajaxChimp({

        language: 'pl',
        url: mailChimpURL

    });

    // Mailchimp translation
    //
    //  Defaults:
    //	 'submit': 'Submitting...',
    //  0: 'We have sent you a confirmation email',
    //  1: 'Please enter a value',
    //  2: 'An email address must contain a single @',
    //  3: 'The domain portion of the email address is invalid (the portion after the @: )',
    //  4: 'The username portion of the email address is invalid (the portion before the @: )',
    //  5: 'This email address looks fake or invalid. Please enter a real email address'

    $.ajaxChimp.translations.es = {
        'submit': 'Submitting...',
        0: '<i class="fa fa-check"></i> Wysłaliśmy Ci e-mail z potwierdzeniem',
        1: '<i class="fa fa-warning"></i> Musisz wprowadzić prawidłowy adres email.',
        2: '<i class="fa fa-warning"></i> Adres e-mail jest nieprawidłowy.',
        3: '<i class="fa fa-warning"></i> Adres e-mail jest nieprawidłowy.',
        4: '<i class="fa fa-warning"></i> Adres e-mail jest nieprawidłowy.',
        5: '<i class="fa fa-warning"></i> Adres e-mail jest nieprawidłowy.'
    }


    /*---------------------------------------------------- */
    /*	contact form
	------------------------------------------------------ */


    /* local validation */
    $('#contactForm').validate({

        /* submit via ajax */
        submitHandler: function(form) {

            var sLoader = $('#submit-loader');

            $.ajax({      	

                type: "POST",
                url: "inc/sendEmail.php",
                data: $(form).serialize(),
                beforeSend: function() { 

                    sLoader.fadeIn(); 

                },
                success: function(msg) {

                    // Message was sent
                    if (msg == 'OK') {
                        sLoader.fadeOut(); 
                        $('#message-warning').hide();
                        $('#contactForm').fadeOut();
                        $('#message-success').fadeIn();
                    }
                    // There was an error
                    else {
                        sLoader.fadeOut(); 
                        $('#message-warning').html(msg);
                        $('#message-warning').fadeIn();
                    }

                },
                error: function() {

                    sLoader.fadeOut(); 
                    $('#message-warning').html("Coś poszło nie tak. Proszę spróbuj ponownie.");
                    $('#message-warning').fadeIn();

                }

            });     		
        }

    });


    /*----------------------------------------------------*/
    /* Final Countdown Settings
	------------------------------------------------------ */
    var finalDate = '2017/11/09';

    $('div#counter').countdown(finalDate)
        .on('update.countdown', function(event) {

        $(this).html(event.strftime('<div class=\"half\">' +
                                    '<span>%D <sup>dni</sup></span>' + 
                                    '<span>%H <sup>godzin</sup></span>' + 
                                    '</div>' +
                                    '<div class=\"half\">' +
                                    '<span>%M <sup>minut</sup></span>' +
                                    '<span>%S <sup>sekund</sup></span>' +
                                    '</div>'));

    });     


})(jQuery);

/*
* File: jquery.simplePopup.js
* Version: 1.0.0
* Description: Create a simple popup to display content
* Author: 9bit Studios
* Copyright 2012, 9bit Studios
* http://www.9bitstudios.com
* Free to use and abuse under the MIT license.
* http://www.opensource.org/licenses/mit-license.php
*/

(function ($) {

    $.fn.simplePopup = function (options) {

        var defaults = $.extend({
            centerPopup: true,
            open: function() {},
            closed: function() {}
        }, options);

        /******************************
	Private Variables
	*******************************/         

        var object = $(this);
        var settings = $.extend(defaults, options);

        /******************************
	Public Methods
	*******************************/         

        var methods = {

            init: function() {
                return this.each(function () {
                    methods.appendHTML();
                    methods.setEventHandlers();
                    methods.showPopup();
                });
            },

            /******************************
	    Append HTML
	    *******************************/			

            appendHTML: function() {

                // if this has already been added we don't need to add it again
                if ($('.simplePopupBackground').length === 0) {
                    var background = '<div class="simplePopupBackground"></div>';
                    $('body').prepend(background);
                }

                if(object.find('.simplePopupClose').length === 0) {
                    var close = '<div class="simplePopupClose"><i class="fa fa-times fa-lg" aria-hidden="true"></i></div>';
                    object.prepend(close);
                }
            },

            /******************************
	    Set Event Handlers
	    *******************************/			

            setEventHandlers: function() {

                $(".simplePopupClose, .simplePopupBackground").on("click", function (event) {
                    methods.hidePopup();
                });

                $(window).on("resize", function(event){

                    if(settings.centerPopup) {
                        methods.positionPopup();
                    }
                });				

            },

            removeEventListners: function() {
                $(".simplePopupClose, .simplePopupBackground").off("click");                
            },

            showPopup: function() {
                $(".simplePopupBackground").css({
                    "opacity": "0.8"
                });

                $(".simplePopupBackground").fadeIn("fast");

                object.fadeIn("slow", function(){
                    settings.open();
                });

                if(settings.centerPopup) {
                    methods.positionPopup();
                }
            },

            hidePopup: function() {
                $(".simplePopupBackground").fadeOut("fast");
                object.fadeOut("fast", function(){
                    methods.removeEventListners();
                    settings.closed();
                });
            },			

            //            positionPopup: function() {
            //                var windowWidth = $(window).width();
            //                var windowHeight = $(window).height();
            //                var popupWidth = object.width();				
            //                var popupHeight = object.height();
            //
            //                var topPos = (windowHeight / 2) - (popupHeight / 2);
            //                var leftPos = (windowWidth / 2) - (popupWidth / 2);
            //                if(topPos < 30) topPos = 30;
            //
            //                object.css({
            //                    "position": "absolute",
            //                    "top": topPos,
            //                    "left": leftPos
            //                });
            //            },			

        };

        if (methods[options]) { // $("#element").pluginName('methodName', 'arg1', 'arg2');
            return methods[options].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof options === 'object' || !options) { 	// $("#element").pluginName({ option: 1, option:2 });
            return methods.init.apply(this);  
        } else {
            $.error( 'Method "' +  method + '" does not exist in simple popup plugin!');
        } 
    };

})(jQuery);
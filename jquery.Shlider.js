/**
* shlider plugin
* shlide right. shlide right. shlide left. shlide right. shlide left again. nishe. very nishe.
* @author Phil Steer
* https://github.com/pdincubus/jquery.Shlider
*/

(function($) {
    $.fn.shlider = function(options) {

        // settings
        var settings = $.extend({
            'animationDuration' : 500,      //milliseconds
            'slideEasing' : 'swing',        //default options are swing or linear
            'includeNav' : true,            //do you want to output next/prev buttons?
            'navId' : 'shliderNav',         //create a blank div with an id
            'navIncludeNumSlides' : false,  //left and right nav plus number of slides shown
            'navNextId' : 'shlideNext',     //pick an ID
            'navPrevId' : 'shlidePrev',     //see above
            'navNumClass' : 'shlideNum',    //pick a class
            'slidesAtOnce' : 1,             //do you want more than one slide to move at once?
            'autoSlide' : false,            //wait for use interaction?
            'waitTime' : 3000               //how long between auto slides?
        }, options);

        return this.each(function() {
            //figure out slides, and number of slides, set where we're at and figure out the width of a slide
            var slides = '#' + $(this).attr('id');
            var slide = slides + ' > li';
            var numSlides = $(slide).size();
            var slidings = Math.ceil(numSlides / settings.slidesAtOnce);
            var currentSlide = 1;
            var slideWidth = $(slide).width();

            if (settings.autoSlide == true) {

                //set auto slide timer
                var autoSlideTimer = setInterval(autoSliding, settings.waitTime);

                //what to do when the timer function is called
                function autoSliding() {
                    if (currentSlide == slidings) {
                        //we're at the beginning, rewind and reset
                        currentSlide = 1;

                        $('#' + settings.navNextId).removeClass('disabled');
                        $('#' + settings.navPrevId).addClass('disabled');

                        $(slides).animate({
                            left: 0
                        }, settings.animationDuration, settings.slideEasing);

                        $('#' + settings.navId + ' .' + settings.navNumClass).text('1 of ' + slidings);
                    }else {
                        if (settings.includeNav == true) {
                            //ensure we don't have any disabled buttons
                            $('#' + settings.navNextId + ', #' + settings.navPrevId).removeClass('disabled');
                        }

                        //do the shhhhlide
                        $(slides).animate({
                            left: '-=' + slideWidth * settings.slidesAtOnce
                        }, settings.animationDuration, settings.slideEasing);

                        //increment the counter
                        currentSlide++;

                        //update nav counter
                        if (settings.navIncludeNumSlides == true && settings.includeNav == true) {
                            $('#' + settings.navId + ' .' + settings.navNumClass).text(currentSlide + ' of ' + slidings);
                        }

                        //disable button if we've just reached the last slide
                        if (currentSlide == slidings && settings.includeNav == true) {
                            $('#' + settings.navNextId).addClass('disabled');
                        }
                    }
                }
            }//end autoSlide

            if (settings.includeNav == true) {

                //create left and right nav
                var navHtml = '<span id="' + settings.navPrevId + '">&lt;</span>';
                if (settings.navIncludeNumSlides == true) {
                    //do we want to know what slide we're on?
                    var navHtml = navHtml + '<span class="' + settings.navNumClass + '">1 of ' + slidings + '</span>';
                }
                var navHtml = navHtml + '<span id="' + settings.navNextId + '">&gt;</span>';

                //add the nav to the nav element
                $('#' + settings.navId).append(navHtml);
                //diable previous to start with, I mean we're already at the beginning.
                $('#' + settings.navPrevId).addClass('disabled');

                //what happens when we click previous?
                $('#' + settings.navPrevId).on('click', function() {

                    //interrupt the timer for auto if it's going
                    if (settings.autoSlide == true) {
                        clearInterval(autoSlideTimer);
                    }

                    //prevent animation queueing
                    if ($(slides).is(':animated') === true) {
                        return;
                    }

                    if (currentSlide == 1) {
                        //we're at the beginning, just disable the button
                        return;
                    }else {
                        //ensure we don't have any disabled buttons
                        $('#' + settings.navNextId + ', #' + settings.navPrevId).removeClass('disabled');

                        //do the shhhhlide
                        $(slides).animate({
                            left: '+=' + slideWidth * settings.slidesAtOnce
                        }, settings.animationDuration, settings.slideEasing);

                        //decrement counter
                        currentSlide--;

                        //update nav counter
                        if (settings.navIncludeNumSlides == true) {
                            $('#' + settings.navId + ' .' + settings.navNumClass).text(currentSlide + ' of ' + slidings);
                        }

                        //disable button if we've just reached the first slide again
                        if (currentSlide == 1) {
                            $('#' + settings.navPrevId).addClass('disabled');
                        }
                    }

                    if (settings.autoSlide == true) {
                        autoSlideTimer = setInterval(autoSliding, settings.waitTime);
                    }
                });

                //what happens when we click next?
                $('#' + settings.navNextId).on('click', function() {

                    //interrupt the timer for auto if it's going
                    if (settings.autoSlide == true) {
                        clearTimeout(autoSlideTimer);
                    }

                    //prevent animation queueing
                    if ($(slides).is(':animated') === true) {
                        return;
                    }

                    if (currentSlide == slidings) {
                        //we're at the beginning, just disable the button
                        return;
                    }else {
                        //ensure we don't have any disabled buttons
                        $('#' + settings.navNextId + ', #' + settings.navPrevId).removeClass('disabled');

                        //do the shhhhlide
                        $(slides).animate({
                            left: '-=' + slideWidth * settings.slidesAtOnce
                        }, settings.animationDuration, settings.slideEasing);

                        //increment the counter
                        currentSlide++;

                        //update nav counter
                        if (settings.navIncludeNumSlides == true) {
                            $('#' + settings.navId + ' .' + settings.navNumClass).text(currentSlide + ' of ' + slidings);
                        }

                        //disable button if we've just reached the last slide
                        if (currentSlide == slidings) {
                            $('#' + settings.navNextId).addClass('disabled');
                        }
                    }

                    if (settings.autoSlide == true) {
                        autoSlideTimer = setInterval(autoSliding, settings.waitTime);
                    }
                });

            }//end includeNav stuff
        });
    };
})(jQuery);

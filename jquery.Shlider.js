 /**
 * shlider plugin
 * shlide right. shlide right. shlide left. shlide right. shlide left again. nishe. very nishe.
 * @author Phil Steer
 * https://github.com/pdincubus/jquery.Shlider
 */
 
(function($){
  $.fn.shlider = function(options){
  
	// settings
	var settings = $.extend( {
        'animationDuration'         : 500,              //milliseconds
        'slideEasing'               : 'swing',          //default options are swing or linear
        'navId'                     : 'shliderNav',     //create a blank div with an id
        'navIncludeNumSlides'       : false,            //left and right nav plus number of slides shown
        'navNextClass'              : 'shlideNext',     //pick a class, any class
        'navPrevClass'              : 'shlidePrev',     //see above
        'navNumClass'               : 'shlideNum',      //see above above
        'slidesAtOnce'				: 1					//do you want more than one slide to move at once?
	}, options);

	return this.each(function() {
		//figure out slides, and number of slides, set where we're at and figure out the width of a slide
        var slides = '#' + $(this).attr('id');
		var slide = slides + ' > li';
		var numSlides = $(slide).size();
		var slidings = Math.ceil(numSlides/settings.slidesAtOnce);
        var currentSlide = 1;
        var slideWidth = $(slide).width();
        
        //create left and right nav
        var navHtml = '<span class="' + settings.navPrevClass + '">&lt;</span>';
        if(settings.navIncludeNumSlides==true){
            //do we want to know what slide we're on?
            var navHtml = navHtml + '<span class="' + settings.navNumClass + '">1 of ' + slidings + '</span>';
        }
        var navHtml = navHtml + '<span class="' + settings.navNextClass + '">&gt;</span>';
        
        //add the nav to the nav element
        $('#' + settings.navId).append(navHtml);
        //diable previous to start with, I mean we're already at the beginning.
        $('.'+settings.navPrevClass).addClass('disabled');        
        
        //what happens when we click previous?
        $('.'+settings.navPrevClass).on('click', function(){
            if(currentSlide==1){
                //we're at the beginning, just disable the button
                return;
            }else{
                //ensure we don't have any disabled buttons
                $('.'+settings.navNextClass+', .'+settings.navPrevClass).removeClass('disabled');
                
                //do the shhhhlide
                $(slides).animate({
                    left: '+='+slideWidth*settings.slidesAtOnce
                }, settings.animationDuration, settings.slideEasing);
                
                //decrement counter
                currentSlide--;
                
                //update nav counter
                if(settings.navIncludeNumSlides==true){
                    $('#' + settings.navId + ' .' + settings.navNumClass).text(currentSlide+' of '+slidings);
                }
                
                //disable button if we've just reached the first slide again
                if(currentSlide==1){
                    $('.'+settings.navPrevClass).addClass('disabled');
                }
            }
        });
        
        //what happens when we click next?
        $('.'+settings.navNextClass).on('click', function(){
            if(currentSlide==slidings){
                //we're at the beginning, just disable the button
                return;
            }else{
                //ensure we don't have any disabled buttons
                $('.'+settings.navNextClass+', .'+settings.navPrevClass).removeClass('disabled');
                
                //do the shhhhlide
                $(slides).animate({
                    left: '-='+slideWidth*settings.slidesAtOnce
                }, settings.animationDuration, settings.slideEasing);
                
                //increment the counter
                currentSlide++;
                
                //update nav counter
                if(settings.navIncludeNumSlides==true){
                    $('#' + settings.navId + ' .' + settings.navNumClass).text(currentSlide+' of '+slidings);
                }
                
                //disable button if we've just reached the last slide
                if(currentSlide==slidings){
                    $('.'+settings.navNextClass).addClass('disabled');
                }
            }
        });
	});
  };
})(jQuery);
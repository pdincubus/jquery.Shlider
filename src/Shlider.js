/**
 * Shlider
 *
 * @author Phil Steer <pd@incb.us>
 * @package Shlider
 */
!function($) {
    var Shlider = function(elem, opts) {
        this.init('shlider', elem, opts);
    };

    Shlider.prototype = {
        constructor: Shlider,
        init: function(type, elem, opts) {
            this.type = type;
            this.$element = $(elem);
            this.options = this.getOptions(opts);
            this.$container = this.$element.find(this.options.container);
            this.$slides = this.$element.find(this.options.slide);
            this.currentSlide = 1;
            this.numSlides = this.$slides.length;
            this.totalSlidings = Math.ceil(this.numSlides / this.options.slidesAtOnce);
            this.slideWidth = this.$slides.eq(0).width();
            this.containerWidth = ( this.slideWidth * this.numSlides );
            this.setup();
        },

        getOptions: function(opts) {
            return $.extend({}, $.fn[this.type].defaults, this.$element.data(), opts);
        },

        setup: function() {
            var that = this;

            //console.log('slides: ', this.$slides, ' numSlides: ', this.numSlides, ' totalSlidings: ', this.totalSlidings, ' slideWidth: ', this.slideWidth, ' containerWidth: ', this.containerWidth);

            this.setDimensions();

            if ( this.options.accessible === true ) {
                this.$container.attr('aria-live', 'assertive');
            }

            if ( this.options.includeNav === true ) {
                this.generateNav();
            }

            if ( this.options.autoSlide === true ) {
                var autoSliderTimer = setInterval( function() {
                    that.autoSlide();
                }, parseInt(this.options.waitTime,10) );
            }

            this.$element.on('click', this.options.navNextElem, function() {
                that.next();
            });

            this.$element.on('click', this.options.navPrevElem, function() {
                that.prev();
            });
        },

        //----------------------------------------------------
        //      set up any dimensions we need
        //----------------------------------------------------
        setDimensions: function() {
            //console.log('set width of container: ', this.containerWidth);

            this.$container.css({
                width: this.containerWidth
            });
        },

        //------------------------------------------------------------------------------
        //    Let things slide on their own
        //------------------------------------------------------------------------------
        autoSlide: function() {
            if ( this.currentSlide == this.totalSlidings ) {
                this.disableNav(this.options.navPrevElem);
                this.animateSlide('reset');
                this.currentSlide = 1;
            } else {
                this.animateSlide('next');
                this.updateNavNum();
            }
        },

        //----------------------------------------------------
        //      slide next
        //----------------------------------------------------
        next: function() {
            console.log('start next, currentSlide: ', this.currentSlide);
            //prevent animation queueing
            if (this.$container.is(':animated') === true) {
                return;
            }

            if ( this.currentSlide == this.totalSlidings ) {
                this.disableNav(this.options.navNextElem);
                return;
            }

            //interrupt the timer for auto if it's going
            if (this.options.autoSlide === true) {
                clearInterval(autoSliderTimer);
            }

            this.animateSlide('next');

            //set timer going again if it's needed
            if (this.options.autoSlide === true) {
                autoSliderTimer = setInterval( function() {
                    that.autoSlide();
                }, parseInt(this.options.waitTime,10) );
            }

            this.currentSlide++;
            this.updateNavNum();

            if ( this.currentSlide == this.totalSlidings ) {
                this.disableNav(this.options.navNextElem);
                return;
            } else {
                this.disableNav('none');
            }

            console.log('end next, currentSlide: ', this.currentSlide);
        },

        //----------------------------------------------------
        //      slide prev
        //----------------------------------------------------
        prev: function() {
            console.log('start prev, currentSlide: ', this.currentSlide);

            //prevent animation queueing
            if (this.$container.is(':animated') === true) {
                return;
            }

            if ( this.currentSlide == 1 ) {
                this.disableNav(this.options.navPrevElem);
                return;
            }

            //interrupt the timer for auto if it's going
            if (this.options.autoSlide === true) {
                clearInterval(autoSliderTimer);
            }

            this.animateSlide('prev');

            //set timer going again if it's needed
            if (this.options.autoSlide === true) {
                autoSliderTimer = setInterval( function() {
                    that.autoSlide();
                }, parseInt(this.options.waitTime,10) );
            }

            this.currentSlide--;
            this.updateNavNum();

            if ( this.currentSlide == 1 ) {
                this.disableNav(this.options.navPrevElem);
                return;
            } else {
                this.disableNav('none');
            }

            console.log('end prev, currentSlide: ', this.currentSlide);
        },

        //----------------------------------------------------
        //      disable nav when we reach either end
        //----------------------------------------------------
        disableNav: function(button) {
            console.log('disable button: ', button);
            if ( button == this.options.navNextElem ) {
                $(this.options.navElem).find(this.options.navNextElem).addClass(this.options.navDisabledClass);
                $(this.options.navElem).find(this.options.navPrevElem).removeClass(this.options.navDisabledClass);
            } else if ( button == this.options.navPrevElem ) {
                $(this.options.navElem).find(this.options.navNextElem).removeClass(this.options.navDisabledClass);
                $(this.options.navElem).find(this.options.navPrevElem).addClass(this.options.navDisabledClass);
            } else if ( button == 'none' ) {
                $(this.options.navElem).find('button').removeClass(this.options.navDisabledClass);
            }
        },

        //----------------------------------------------------
        //      animate the slide
        //----------------------------------------------------
        animateSlide: function(direction) {
            var distance = ( this.slideWidth * this.options.slidesAtOnce );

            //console.log(distance, this.options.slidesAtOnce);

            if ( direction == 'next' ) {
                this.$container.animate({
                    left: '-=' + distance
                }, this.options.animationDuration, this.options.slideEasing);
            } else if ( direction == 'prev' ) {
                this.$container.animate({
                    left: '+=' + distance
                }, this.options.animationDuration, this.options.slideEasing);

            } else if ( direction == 'reset' ) {
                this.$container.animate({
                    left: 0
                }, this.options.animationDuration, this.options.slideEasing);
            }
        },

        //----------------------------------------------------
        //      update navigation
        //----------------------------------------------------
        updateNavNum: function() {
            if (this.options.navIncludeNumSlides === true) {
                this.$element.find(this.options.navElem + ' .current').text(this.currentSlide);
                this.$element.find(this.options.navElem + ' .total').text(this.totalSlidings);

                console.log(this.currentSlide, this.totalSlidings);
            }
        },

        //----------------------------------------------------
        //      generate nav html
        //----------------------------------------------------
        generateNav: function() {
            var navElemDetails = '';

            if ( this.options.navElem.match('^.') ) {
                navElemDetails = 'class="' + this.options.navElem.replace('.','') + '"';
            } else if ( this.options.navElem.match('^#') ) {
                navElemDetails = 'id="' + this.options.navElem.replace('#','') + '"';
            }

            var navHtml = '<nav ' + navElemDetails + '><button role="button" type="button" class="' + this.options.navPrevElem.replace('.','') + ' ' + this.options.navDisabledClass + '">Previous</button>';

            if( this.options.navIncludeNumSlides === true ) {
                navHtml = navHtml + '<span class="' + this.options.navNumElem.replace('.','') + '"><span class="current">1</span> of <span class="total">' + this.totalSlidings + '</span></span>';
            }

            navHtml = navHtml + '<button role="button" type="button" class="' + this.options.navNextElem.replace('.','') + '">Next</button></nav>';

            //console.log(navHtml);

            this.$element.append(navHtml);
        }
    };

    $.fn.shlider = function(option) {
        var args = Array.prototype.slice.call(arguments, 1);

        if (typeof option === 'string' && $.inArray(option, []) !== -1) {
            var data = this.data('shlider');
            return data[option].apply(data, args);
        }

        return this.each(function() {
            var $this = $(this),
               data = $this.data('shlider'),
               options = typeof option == 'object' && option;

            if (!data) {
                $this.data('shlider', data = new Shlider(this, options));
            }

            if (typeof option == 'string') {
                data[option]();
            }
        });
    };

    $.fn.shlider.defaults = {
        'animationDuration' : 500,
        'slideEasing' : 'swing',
        'container': '.container',
        'slide': '.slide',
        'includeNav' : true,
        'navIncludeNumSlides' : true,
        'navElem' : '.shliderNav',
        'navNextElem' : '.shlideNext',
        'navPrevElem' : '.shlidePrev',
        'navNumElem' : '.shlideNum',
        'navDisabledClass': 'disabled',
        'slidesAtOnce' : 1,
        'autoSlide' : true,
        'waitTime' : 3000,
        'accessible': true
    };
}(window.jQuery);

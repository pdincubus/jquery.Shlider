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
            this.setup();
        },

        getOptions: function(opts) {
            return $.extend({}, $.fn[this.type].defaults, this.$element.data(), opts);
        },

        setup: function() {
            var that = this,
                $slides = this.$element.find(this.options.slide),
                numSlides = $slides.length,
                slidings = Math.ceil(numSlides / this.options.slidesAtOnce),
                currentSlide = 1,
                slideWidth = $slides.eq(0).width();

            console.log('slides: ', $slides, ' numSlides: ', numSlides, ' slidings: ', slidings, ' currentSlide: ', currentSlide, ' slideWidth: ', slideWidth);

            //------------------------------------------------------------------------------
            //    accessibility things
            //------------------------------------------------------------------------------
            if ( this.options.accessible === true ) {
                this.$element.find(this.options.container + ' ' + this.options.slide).attr('aria-live', 'assertive');
            }

            //------------------------------------------------------------------------------
            //    set up nav buttons
            //------------------------------------------------------------------------------
            if ( this.options.showNav === true ) {
                var navHtml = '<nav><button class="' + this.options.navPrevElem.replace('.','') + '">Previous</button>';

                if( this.options.navIncludeNumSlides === true ) {
                    navHtml = navHtml + '<span class="' + this.options.navNumElem + '"><span class="current">1</span> of <span class="total">' +  + '</span>';
                }

                navHtml = navHtml + '<button class="' + this.options.navNextElem.replace('.','') + '">Next</button></nav>');

                this.$element.append(navHtml);
            }
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
        'slide': '.slide',
        'includeNav' : true,
        'navIncludeNumSlides' : false,
        'navElem' : 'shliderNav',
        'navNextElem' : '.shlideNext',
        'navPrevElem' : '.shlidePrev',
        'navNumElem' : '.shlideNum',
        'slidesAtOnce' : 1,
        'autoSlide' : false,
        'waitTime' : 3000,
        'accessible': true
    };
}(window.jQuery);

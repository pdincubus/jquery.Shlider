# jquery.Shlider plugin

Turns a ```<ul>``` into a very simple but sexy shlidey shlider that can slide one or more list items at once.

It's really tiny - just <del>4,400</del> 7,972 bytes uncompressed, <del>1,558</del> 2,238 bytes compressed! (And most of the 8KB uncompressed is space and comments!)

There's a couple of demos to see it in action: [Basic, one slide at a time](http://pdincubus.github.com/jquery.Shlider/index.html), [Three slides at once](http://pdincubus.github.com/jquery.Shlider/multiple.html) or [Auto slider](http://pdincubus.github.com/jquery.Shlider/auto.html)

## Basic example

### HTML

```html
<div id="shliderContainer">
    <ul class="cf" id="shlider">
        <li>
            <!--content of slide-->
        </li>
        <li>
            <!--content of slide-->
        </li>
        <li>
            <!--content of slide-->
        </li>
    </ul>
    <!--this is for the nav next/prev/counter-->
    <div id="shliderNav"></div>
</div>
```

### CSS

I use the clearfix from [HTML5 Boilerplate](http://www.html5boilerplate.com) to clear the floated ```<li>``` elements.

Here's a basic idea of some CSS that will get you on your way:

```css
#shliderContainer {
    width: width of your slides;
    height: height of your slides;
    margin: 0 auto;
    overflow: hidden;
    position: relative;
}

#shliderNav {
    position: absolute;
    top: 10px;
    right: 10px;
    z-index: 1000;
    font-size: 18px;
}

#shliderNav span.shlidePrev, #shliderNav span.shlideNext {
    cursor: pointer;
    padding: 2px 5px;
    display: inline-block;
}

#shliderNav span.disabled {
    color: #ccc;
}

#shliderNav span.shlideNum {
    margin: 2px 10px;
    display: inline-block;
}

ul#shlider {
    list-style: none;
    margin: 0;
    padding: 0;
    position: absolute;
    top: 0;
    left: 0;
    width: width of all your slides combined;
    height: height of your slide;
}

ul#shlider li {
    display: block;
    float: left;
    width: width of your slide;
    height: height of your slide;
    margin: 0;
    position: relative;
}
```

### jQuery

Make sure you have called jQuery, pulled in the shlider js file (and easing if you want those effects too) before you try to run Shlider:

```html
<script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js"></script>
<script type="text/javascript" src="http://cachedcommons.org/cache/jquery-easing/1.3.0/javascripts/jquery-easing-min.js"></script>
<script type="text/javascript" src="/path/to/js/jquery.Shlider.js"></script>
```

Call shlider to run on the ```<ul>``` inside your ```<div>``` container. Ensure you have set an ID on it! This can be on ```$(document).ready()``` if you prefer. I use ```$(window).load``` so that I know all images, etc have finished loading before anything happens.

Here are all the possible settings, and their defaults

```javascript
$(window).load(function() {
    $('#shlider').shlider({
        'animationDuration'     : 500,          //milliseconds
        'slideEasing'           : 'swing',      //default options are swing or linear
        'includeNav'            : true,         //do you want to output next/prev buttons?
        'navId'                 : 'shliderNav', //create a blank div with an id
        'navIncludeNumSlides'   : false,        //left and right nav plus number of slides shown
        'navNextId'             : 'shlideNext', //pick an ID
        'navPrevId'             : 'shlidePrev', //see above
        'navNumClass'           : 'shlideNum',  //pick a class
        'slidesAtOnce'          : 1,            //do you want more than one slide to move at once?
        'autoSlide'             : false,        //wait for use interaction?
        'waitTime'              : 3000          //how long between auto slides?
    });
});
```

## Browsers

It's pretty simple as a plugin so should work on any graphical browser with javascript enabled. I've tested in Firefox and Chrome. So likely it will work in Opera, Safari, IE10, IE9, IE8, and maybe IE7 & IE6 at a push. Maybe.

## Photos

My dad takes nice photos. He let me use them because he's nice. [You should go and look at them](http://www.flickr.com/photos/dsnine). All rights reserved and all that kind of stuff, yeah?

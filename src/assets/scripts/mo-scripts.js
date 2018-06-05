//import { TweenMax, TimelineMax, TimelineLite } from "gsap";

var darkBlue = '#002337';
var lightBlue = '#00a1bb';
var white = '#fff';
var screenSmall = 576;
var screenMedium = 768;
var screenLarge = 992;
var screenExtraLarge = 1200;
var screenWidth, screenHeight;
var firstLoad = true;

$(document).ready(function() {

    screenWidth = window.outerWidth;
    screenHeight = window.outerHeight;
    console.log(screenWidth + " x " + screenHeight);

    // Initialize FullPage
    $('#fullpage').fullpage({
        anchors: ['home', 'overview', 'highlights', 'press-kit', 'corporate-payment-solutions', 'contact-us'],
        menu: '#main-nav',
        controlArrows: false,
        sectionsColor: [darkBlue, white, darkBlue, white, darkBlue, white],
        loopHorizontal: false,
        slidesNavigation: false,
        fitToSection: true,
        autoScrolling: true,
        afterRender: function(){
            startAnimation();
            //document.getElementById('home-video').play();
        }
    });

    $('#insights-content').on('init', function(event, slick){
        //$('.slick-arrow').attr('style', 'display:block; width:50px; height:50px; position:absolute; top:35%;');
        $('.slick-next').attr('style', 'float:right; right:-100px;');
        $('.slick-prev').attr('style', 'float:left; left:-100px;');
        $('.slick-disabled').css('display', 'none');
    });

    $('#overview-content').slick({
        infinite: false,
        nextArrow: `<div class="slick-button slick-next">
                        <svg viewBox="0 0 8 8" class="icon">
                            <use xlink:href="#chevron-right" class="icon-next" fill="`+darkBlue+`"></use>
                        </svg>
                    </div>`,
        prevArrow: `<div class="slick-button slick-prev">
                        <svg viewBox="0 0 8 8" class="icon">
                            <use xlink:href="#chevron-left" class="icon-previous" fill="`+darkBlue+`"></use>
                        </svg>
                    </div>`   
    }).on('afterChange', function(){
        $('.slick-arrow').css('display', 'block');
        $('.slick-disabled').css('display', 'none');
    });

    $('#insights-content').slick({
        infinite: false,
        nextArrow: `<div class="slick-button slick-next">
                        <svg viewBox="0 0 8 8" class="icon">
                            <use xlink:href="#chevron-right" class="icon-next" fill="`+white+`"></use>
                        </svg>
                    </div>`,
        prevArrow: `<div class="slick-button slick-prev">
                        <svg viewBox="0 0 8 8" class="icon">
                            <use xlink:href="#chevron-left" class="icon-previous" fill="`+white+`"></use>
                        </svg>
                    </div>`,
        slidesToShow: 3   
    }).on('afterChange', function(){
        $('.slick-arrow').css('display', 'block');
        $('.slick-disabled').css('display', 'none');
    });

    $('#findings-content').slick({
        infinite: false,
        nextArrow: `<div class="slick-button slick-next">
                        <svg viewBox="0 0 8 8" class="icon">
                            <use xlink:href="#chevron-right" class="icon-next" fill="`+darkBlue+`"></use>
                        </svg>
                    </div>`,
        prevArrow: `<div class="slick-button slick-prev">
                        <svg viewBox="0 0 8 8" class="icon">
                            <use xlink:href="#chevron-left" class="icon-previous" fill="`+darkBlue+`"></use>
                        </svg>
                    </div>`  
    }).on('afterChange', function(){
        $('.slick-arrow').css('display', 'block');
        $('.slick-disabled').css('display', 'none');
    });

    // Inject SVGs
    var mySVGsToInject = document.querySelectorAll('.iconic-sprite');
    SVGInjector(mySVGsToInject);

    if(screenWidth > screenSmall){

        // Initialize popovers
        $('[data-toggle="popover"]').popover({
            placement: 'left',
            trigger: 'hover'
        });

        //Animation for main navigation buttons
        TweenMax.staggerFromTo("#main-nav .nav-item", 0.2, {
            x: 50,
            ease: 'Strong.easeInOut'
        }, {
            x: 0,
            delay: 0.5
        }, 0.1, function(){
            console.log("done");
        });
    }else{

        // Initialize popovers
        $('[data-toggle="popover"]').popover({
            placement: 'top',
            trigger: 'hover'
        });

        //Animation for main navigation buttons
        TweenMax.staggerFromTo("#main-nav .nav-item", 0.2, {
            y: 50,
            ease: 'Strong.easeInOut'
        }, {
            y: 0,
            delay: 0.5
        }, 0.1, function(){
            console.log("navigation done");
        });
    }
});

function startAnimation(){
    //Scroll Animation
    var controller = new ScrollMagic.Controller();

    $('.section.fade').each(function(){
        // Create a scene for each project
        var myScene = new ScrollMagic.Scene({
            triggerElement: this,
            triggerHook: 0.8
        })
        //.addIndicators()
        .setClassToggle(this, 'fade-in')
        .addTo(controller);
    });

    /* Home Animation */
    var homeContent = '#section-home',
        homeVideo = $('#video-bg'),
        homeTitle = $('#section-home h1'),
        homeHR = $('#section-home hr'),
        homeSubtitle = $('#section-home h3');
    TweenMax.set(homeContent, {visibility:'visible'});
    var homeAnimation = new TimelineMax();
    firstLoad ? homeAnimation.delay(1) : homeAnimation.delay(2);
    homeAnimation.from(homeVideo, 1, {opacity:0});
    homeAnimation.from(homeTitle, 1, {'top':'-100px', opacity:0, ease:Power4.easeOut}, "-=0.5");
    homeAnimation.from(homeHR, 1, {width: '0%', left: '0px', ease:Cubic.easeOut}, "-=0.5");
    homeAnimation.from(homeSubtitle, 1, {'left':'-100px', opacity:0, ease:Power4.easeOut}, "-=0.5");
    var homeScene = new ScrollMagic.Scene({
        triggerElement: 'body',
        triggerHook: 0.5
    })
    .setTween(homeAnimation)
    //.addIndicators({name: "Home"})
    .addTo(controller)
    .on("end", function(){
        firstLoad = false;
    });

    /* Overview Animation */ 
    var overviewContent = '#section-overview',
        overviewTitle = $('#section-overview .heading h1'),
        overviewSubTitle = $('#section-overview .heading h4'),
        overviewHR = $('#section-overview hr'),
        overviewSlides = $('#section-overview #overview-content'),
        overviewSVGStroke = $('#section-overview svg #circle-stroke');
        overviewImage = $('#section-overview .overview-image');
    var overviewAnimation = new TimelineMax();
    firstLoad ? overviewAnimation.delay(1) : overAnimation.delay(1.5);
    overviewAnimation.from(overviewTitle, 1, {'top':'-100px', opacity:0, ease:Bounce.easeOut}, "-=0.5");
    overviewAnimation.from(overviewSubTitle, 1, {'left': '-100px', opacity:0, ease:Bounce.easeOut}, "-=0.5");
    overviewAnimation.from(overviewHR, 1, {width: '0%', left: '0px', ease:Cubic.easeOut}, "-=0.5");
    overviewAnimation.from(overviewSlides, 1, {'right': '-100px', opacity:0, ease:Power4.easeOut}, "-=0.5");
    overviewAnimation.add(TweenMax.to(overviewSVGStroke, 1, {strokeDashoffset: 0, ease:Linear.easeNone}), "-=1");
    overviewAnimation.from(overviewImage, 1, {opacity:0, ease:Power4.easeOut});
    var overviewScene = new ScrollMagic.Scene({
        triggerElement: overviewContent,
        triggerHook: 0.5
    })
    .setTween(overviewAnimation)
    //.addIndicators({name: "Overview"})
    .addTo(controller)
    .on("end", function(){
        firstLoad = false;
    });;
}
//import { TweenMax, TimelineMax, TimelineLite } from "gsap";

var darkBlue = '#002337';
var lightBlue = '#00a1bb';
var white = '#fff';
var screenSmall = 576;
var screenMedium = 768;
var screenLarge = 992;
var screenExtraLarge = 1200;
var screenWidth, screenHeight;
var socialIcons, slickArrows;
var firstLoad = true;

$(document).ready(function() {

    screenWidth = window.outerWidth;
    screenHeight = window.outerHeight;
    console.log(screenWidth + " x " + screenHeight);
    socialIcons = $("#social-icons .nav-link");
    slickArrows = $('.slick-arrow');

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
        },
        onLeave: function(index, nextIndex, direction){
            if( nextIndex%2 == 0 ){
                socialIcons.css('color', darkBlue);
                slickArrows.css('color', darkBlue);
                console.log("blue");
            }else{
                socialIcons.css('color', white);
                slickArrows.css('color', white);
                console.log("white");
            }
        }
    });

    /*$('#insights-content').on('init', function(event, slick){
        $('.slick-next').attr('style', 'float:right; right:-100px;');
        $('.slick-prev').attr('style', 'float:left; left:-100px;');
        $('.slick-disabled').css('display', 'none');
    });*/

    $('#overview-content').slick({
        infinite: false,
        nextArrow: `<div class="slick-button slick-next" style="color:`+darkBlue+`;">
                        <i class="fas fa-chevron-right fa-lg"></i>
                    </div>`,
        prevArrow: `<div class="slick-button slick-prev" style="color:`+darkBlue+`;">
                        <i class="fas fa-chevron-left fa-lg"></i>
                    </div>`   
    }).on('afterChange', function(){
        $('.slick-arrow').css('display', 'block');
        $('.slick-disabled').css('display', 'none');
    });

    $('#insights-content').slick({
        infinite: false,
        nextArrow: `<div class="slick-button slick-next" style="color:`+white+`">
                        <i class="fas fa-chevron-right fa-lg"></i>
                    </div>`,
        prevArrow: `<div class="slick-button slick-prev" style="color:`+white+`">
                        <i class="fas fa-chevron-left fa-lg"></i>
                    </div>`,
        slidesToShow: 3   
    }).on('afterChange', function(){
        $('.slick-arrow').css('display', 'block');
        $('.slick-disabled').css('display', 'none');
    });

    $('#findings-content').slick({
        infinite: false,
        nextArrow: `<div class="slick-button slick-next" style="color:`+darkBlue+`;">
                        <i class="fas fa-chevron-right fa-lg"></i>
                    </div>`,
        prevArrow: `<div class="slick-button slick-prev" style="color:`+darkBlue+`;">
                        <i class="fas fa-chevron-left fa-lg"></i>
                    </div>`
    }).on('afterChange', function(){
        $('.slick-arrow').css('display', 'block');
        $('.slick-disabled').css('display', 'none');
    });

    // Inject SVGs
    /*var mySVGsToInject = document.querySelectorAll('.iconic-sprite');
    SVGInjector(mySVGsToInject);*/

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
    var controller_h = new ScrollMagic.Controller({vertical:false});

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
    firstLoad ? homeAnimation.delay(0.5) : homeAnimation.delay(2);
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
    firstLoad ? overviewAnimation.delay(1) : overAnimation.delay(0);
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
    });

    /* Insights Animation */
    var insightsContent = '#section-insights',
        insightsTitle = $('#section-insights .heading h1'),
        insightsSlides = $('#section-insights .insight');
    var insightsAnimation = new TimelineMax();
    firstLoad ? insightsAnimation.delay(1) : insightsAnimation.delay(0);
    insightsAnimation.from(insightsTitle, 1, {'top':'-100px', opacity:0, ease:Bounce.easeOut}, "-=0.5");
    insightsAnimation.staggerFromTo(insightsSlides, 1, {y:'100%', ease:Ease.easeOut}, {y:'0%', delay:0.5}, 0.1);
    var insightsScene = new ScrollMagic.Scene({
        triggerElement: insightsContent,
        triggerHook: 0.5
    })
    .setTween(insightsAnimation)
    .addTo(controller)
    .on("end", function(){
        firstLoad = false;
    });

    /* Report Animation */
    var reportContent = '#section-report',
        reportTitle = $('#section-report .heading h1'),
        reportCopy = $('#section-report .report-copy'),
        reportForm = $('#section-report .report-form'),
        reportFormRows = $('#section-report .report-form .row');
    var reportAnimation = new TimelineMax();
    firstLoad ? reportAnimation.delay(1) : reportAnimation.delay(0);
    reportAnimation.from(reportTitle, 1, {'top':'-100px', opacity:0, ease:Bounce.easeOut}, "-=0.5");
    reportAnimation.from(reportCopy, 1, {left:'-100%', ease:Back.easeInOut}, "-=0.5");
    reportAnimation.from(reportForm, 1, {opacity:0, ease:Cubic.easeInOut}, "-=0.5");
    reportAnimation.staggerFromTo(reportFormRows, 1, {x:'120%', ease:Back.easeInOut}, {x:'0%', delay:0}, 0.1);
    var reportScene = new ScrollMagic.Scene({
        triggerElement: reportContent
    })
    .setTween(reportAnimation)
    .addTo(controller_h)
    .on("end", function(){
        firstLoad = false;
    });

    /* Key Findings Animation */
    var findingsContent = '#section-presentation',
        findingsTitle = $('#section-presentation .heading h1'),
        findingsSlides = $('#section-presentation #findings-content');
    var findingsAnimation = new TimelineMax();
    firstLoad ? findingsAnimation.delay(1) : findingsAnimation.delay(0);
    findingsAnimation.from(findingsTitle, 1, {'top':'-100px', opacity:0, ease:Bounce.easeOut}, "-=0.5");
    findingsAnimation.from(findingsSlides, 1, {opacity:0}, "-=0.5");
    var findingsScene = new ScrollMagic.Scene({
        triggerElement: findingsContent
    })
    .setTween(findingsAnimation)
    .addTo(controller)
    .on("end", function(){
        firstLoad = false;
    });

    /* Press Release Animation */
    var prContent = '#section-press-release',
        prTitle = $('#section-press-release .heading h1'),
        prEnglish = $('#section-press-release .english'),
        prArabic = $('#section-press-release .arabic');
    var prAnimation = new TimelineMax();
    firstLoad ? prAnimation.delay(1) : prAnimation.delay(0);
    prAnimation.from(prTitle, 1, {'top':'-100px', opacity:0, ease:Bounce.easeOut}, "-=0.5");
    prAnimation.from(prEnglish, 1, {left:'-100%', opacity:0, ease:Back.easeInOut}, "-=0.5");
    prAnimation.from(prArabic, 1, {right:'-100%', opacity:0, ease:Back.easeInOut}, "-=0.5");
    var prScene = new ScrollMagic.Scene({
        triggerElement: prContent
    })
    .setTween(prAnimation)
    .addTo(controller_h)
    .on("end", function(){
        firstLoad = false;
    });

    /* CPS Animation */
    var cpsContent = '#section-cps',
        cpsTitle = $('#section-cps .heading h1'),
        cpsCopy = $('#section-cps .cps-copy'),
        cpsForm = $('#section-cps .cps-form'),
        cpsFormRows = $('#section-cps .cps-form .row');
    var cpsAnimation = new TimelineMax();
    firstLoad ? cpsAnimation.delay(1) : cpsAnimation.delay(0);
    cpsAnimation.from(cpsTitle, 1, {'top':'-100px', opacity:0, ease:Bounce.easeOut}, "-=0.5");
    cpsAnimation.from(cpsCopy, 1, {left:'-100%', ease:Back.easeInOut}, "-=0.5");
    cpsAnimation.from(cpsForm, 1, {opacity:0, ease:Cubic.easeInOut}, "-=0.5");
    cpsAnimation.staggerFromTo(cpsFormRows, 1, {x:'120%', ease:Back.easeInOut}, {x:'0%', delay:0}, 0.1);
    var cpsScene = new ScrollMagic.Scene({
        triggerElement: cpsContent
    })
    .setTween(cpsAnimation)
    .addTo(controller)
    .on("end", function(){
        firstLoad = false;
    });

    /* Contact Us Animation */
    var contactUsContent = '#section-contact-us',
        contactUsTitle = $('#section-contact-us .heading h1'),
        contactUsForm = $('#section-contact-us .contact-form'),
        contactUsFormRows = $('#section-contact-us .contact-form .row');
    var contactUsAnimation = new TimelineMax();
    firstLoad ? contactUsAnimation.delay(1) : contactUsAnimation.delay(0);
    contactUsAnimation.from(contactUsTitle, 1, {'top':'-100px', opacity:0, ease:Bounce.easeOut}, "-=0.5");
    contactUsAnimation.from(contactUsForm, 1, {opacity:0, ease:Cubic.easeInOut}, "-=0.5");
    contactUsAnimation.staggerFromTo(contactUsFormRows, 1, {x:'120%', ease:Back.easeInOut}, {x:'0%', delay:0}, 0.1);
    var contactUsScene = new ScrollMagic.Scene({
        triggerElement: contactUsContent
    })
    .setTween(contactUsAnimation)
    .addTo(controller)
    .on("end", function(){
        firstLoad = false;
    });
}
//import { TweenMax, TimelineMax, TimelineLite } from "gsap";

var darkBlue = "#002337";
var lightBlue = "#00a1bb";
var white = "#fff";
var screenSmall = 576;
var screenMedium = 768;
var screenLarge = 992;
var screenExtraLarge = 1200;
var screenWidth, prevScreenWidth, screenHeight, prevScreenHeight;
var socialIcons, slickArrows;
var firstLoad = true;
var fullpageCreated = false;
var slickCreated = false;
var scrollMagicCreated = false;

var controller;
var controller_h;
var sectionFadeScene;
var homeAnimation, homeScene;
var overviewAnimation, overviewScene;
var insightsAnimation, insightsScene;
var reportAnimation, reportScene;
var findingsAnimation, findingsScene;
var prAnimation, prScene;
var cpsAnimation, cpsScene;
var contactUsAnimation, contactUsScene;

var overviewSlick;
var findingsSlick;
var insightsSlick;

var mobile = false;
var screenResizeCount = 0;
var resizeId;


$(document).ready(function() {

    screenWidth = $(window).width();
    screenHeight = $(window).height();
    prevScreenWidth = screenWidth;
    $('#console').append("<p>Document Ready: W("+screenWidth + ") x H(" + screenHeight + ")</p>");

    (screenWidth > screenSmall) ? mobile = false : mobile = true;

    $("#console").append("<p>document ready mobile: "+mobile+"</p>");

    socialIcons = $("#social-icons .nav-link");
    slickArrows = $(".slick-arrow");
    $('[data-toggle="popover"]').popover({
        placement : 'left',
        trigger : 'hover'
    });
    setupPage();

});

$( window ).resize(function() {

    screenWidth = $(window).width();
    screenHeight = $(window).height();
    (screenWidth > screenSmall) ? mobile = false : mobile = true;

    $("#console").html("");
    $("#console").append("<p>Window Resize: W("+screenWidth + ") x H(" + screenHeight + ")</p>");
    $("#console").append("<p>**** Window Resize: mobile = "+mobile+" ****</p>");

    if(!mobile && screenWidth != prevScreenWidth){
        clearTimeout(resizeId);
        resizeId = setTimeout(function(){ 
            screenResizeCount += 1;
            screenWidth = window.outerWidth;
            screenHeight = window.outerHeight;
            //$('#console').append('<p>Screen has been resized '+ screenResizeCount +' times</p>');
            $("#console").append("<p>===== Screen Resized "+ screenResizeCount +" times ====</p>");
            //console.log(screenWidth + " x " + screenHeight);
            /*overviewSlick = $('#overview-content').slick('unslick');
            findingsSlick = $('#findings-content').slick('unslick');
            insightsSlick = $('#insights-content').slick('unslick');*/
            /*homeAnimation.progress(0); homeScene.setTween(homeAnimation);
            overviewAnimation.progress(0); overviewScene.setTween(overviewAnimation);
            insightsAnimation.progress(0); insightsScene.setTween(insightsAnimation);
            reportAnimation.progress(0); reportScene.setTween(reportAnimation);
            findingsAnimation.progress(0); findingsScene.setTween(findingsAnimation);
            prAnimation.progress(0); prScene.setTween(prAnimation);
            cpsAnimation.progress(0); cpsScene.setTween(cpsAnimation);
            contactUsAnimation.progress(0); contactUsScene.setTween(contactUsAnimation);*/
            $.fn.fullpage.destroy('all');
            fullpageCreated = false;
            setupPage();
        }, 1000);
    }
    if(mobile && screenResizeCount > 0){
        $("#console").append("<p>function not supported as browser is not on a mobile</p>");
    }
});

function setupPage(){

    if(!mobile){

        $('.mobile').css('display', 'none');
        $('.desktop').css('display', 'block');
        //$('#console').html('<p>ScreenWidth is bigger than 576px</p>');

        initPage({
            'screenSize': 'large',
            fpID: '#fullpage-desktop',
            fpAnchors: ['home', 'overview', 'insights', 'press-information', 'corporate-payment-solutions', 'contact-us'],
            fpSectionsColor: [darkBlue, white, darkBlue, white, darkBlue, white],
            fpScroll: 1,
            fpAutoScrolling: true,
            popPlacement: 'left',
            popTrigger: 'hover'
        });

        //Animation for main navigation buttons
        TweenMax.staggerFromTo("#main-nav .nav-item", 0.2, {
            x: 50,
            ease: 'Strong.easeInOut'
        }, {
            x: 0,
            delay: 0.5
        }, 0.1, function(){
            $("#console").append("<p>desktop navigation done</p>");
        });
    }else{

        //$('#console').html('<p>ScreenWidth is smaller than 576px</p>');
        $('.mobile').css('display', 'block');
        $('.desktop').css('display', 'none');

        initPage({
            screenSize: 'small',
            fpID: '#fullpage-mobile',
            fpAnchors: ['home', 'overview', 'insights', 'report', 'press-information', 'press-release', 'corporate-payment-solutions', 'contact-us'],
            fpSectionsColor: [darkBlue, white, darkBlue, white, darkBlue, white, darkBlue, white],
            fpScroll: 1,
            fpAutoScrolling: false,
            popPlacement: 'top',
            popTrigger: 'hover'
        });

        var navItemsNum = $("#main-nav .nav-item").length; 
        var navItemsWidth = screenWidth/navItemsNum;
        $("#main-nav .nav-item").css('width', navItemsWidth+'px');

        //Animation for main navigation buttons
        TweenMax.staggerFromTo("#main-nav .nav-item", 0.2, {
            y: 50,
            ease: 'Strong.easeInOut'
        }, {
            y: 0,
            delay: 0.5
        }, 0.1, function(){
            $("#console").append("<p>mobile navigation done</p>");
        });
    }

}

function initPage(_ref){
    var screenSize = _ref.screenSize,
        fpID = _ref.fpID,
        fpAnchors = _ref.fpAnchors,
        fpSectionsColor = _ref.fpSectionsColor,
        fpScroll = _ref.fpScroll,
        fpAutoScrolling = _ref.fpAutoScrolling,
        popPlacement = _ref.popPlacement,
        popTrigger = _ref.popTrigger;

    if(fullpageCreated === false){

        // Initialize FullPage
        $(fpID).fullpage({
            anchors: fpAnchors,
            menu: '#main-nav',
            controlArrows: false,
            sectionsColor: fpSectionsColor,
            normalScrollElementTouchThreshold: fpScroll,
            loopHorizontal: false,
            slidesNavigation: false,
            fitToSection: true,
            autoScrolling: fpAutoScrolling,
            afterRender: function(){
                if(scrollMagicCreated === false){
                    $("#console").append("<p>ScrollMagic created on "+fpID+"</p>");
                    startAnimation();
                    scrollMagicCreated = true;
                }else{
                    $("#console").append("<p>ScrollMagic destroyed on "+fpID+"</p>");
                    /*controller.destroy();
                    controller_h.destroy();
                    sectionFadeScene.destroy();
                    homeScene.destroy();
                    overviewScene.destroy();
                    insightsScene.destroy();
                    reportScene.destroy();
                    findingsScene.destroy();
                    prScene.destroy();
                    cpsScene.destroy();
                    contactUsScene.destroy();*/
                    //controller, controller_h, sectionFadeScene, homeScene, homeAnimation, overviewScene, overviewAnimation, insightsScene, insightsAnimation, reportScene, reportAnimation, findingsScene, findingsAnimation, prScene, prAnimation, cpsScene, cpsAnimation, contactUsScene, contactUsAnimation = null;
                    /*homeScene.progress(0);
                    overviewScene.progress(0);
                    insightsScene.progress(0);
                    reportScene.progress(0);
                    findingsScene.progress(0);
                    prScene.progress(0);
                    cpsScene.progress(0);
                    contactUsScene.progress(0);*/
                    startAnimation();
                    //scrollMagicCreated = false;
                }
                //document.getElementById('home-video').play();
            },
            onLeave: function(index, nextIndex, direction){
                if( nextIndex%2 == 0 ){
                    socialIcons.css('color', darkBlue);
                    slickArrows.css('color', darkBlue);
                }else{
                    socialIcons.css('color', white);
                    slickArrows.css('color', white);
                }
            }
        });
        
        $.fn.fullpage.moveTo(1, 0);
        fullpageCreated = true;

        overviewSlick = $('#overview-content').not('.slick-initialized').slick({
            infinite: false,
            nextArrow: "<div class=\"slick-button slick-next\" style=\"color:inherit;\">\n                            <i class=\"fas fa-chevron-right fa-lg\"></i>\n                        </div>",
            prevArrow: "<div class=\"slick-button slick-prev\" style=\"color:inheirt;\">\n                            <i class=\"fas fa-chevron-left fa-lg\"></i>\n                        </div>"
        }).on('afterChange', function () {
            $('.slick-arrow').css('display', 'block');
            $('.slick-disabled').css('display', 'none');
        });

        findingsSlick = $('#findings-content').not('.slick-initialized').slick({
            infinite: false,
            nextArrow: "<div class=\"slick-button slick-next\" style=\"color:inherit;\">\n                            <i class=\"fas fa-chevron-right fa-lg\"></i>\n                        </div>",
            prevArrow: "<div class=\"slick-button slick-prev\" style=\"color:inherit;\">\n                            <i class=\"fas fa-chevron-left fa-lg\"></i>\n                        </div>"
        }).on('afterChange', function () {
            $('.slick-arrow').css('display', 'block');
            $('.slick-disabled').css('display', 'none');
        });

        insightsSlick = $('#insights-content').not('.slick-initialized').slick({
            infinite: false,
            nextArrow: "<div class=\"slick-button slick-next\" style=\"color:inherit;\">\n                            <i class=\"fas fa-chevron-right fa-lg\"></i>\n                        </div>",
            prevArrow: "<div class=\"slick-button slick-prev\" style=\"color:inherit;\">\n                            <i class=\"fas fa-chevron-left fa-lg\"></i>\n                        </div>",
            slidesToShow: 3,
            responsive: [{
                breakpoint: screenExtraLarge,
                settings: {
                    slidesToShow: 3
                }
            }, {
                breakpoint: screenLarge,
                settings: {
                    slidesToShow: 1
                }
            }]
        }).on('afterChange', function () {
            $('.slick-arrow').css('display', 'block');
            $('.slick-disabled').css('display', 'none');
        });

        /*overviewSlick = $('#overview-content').not('.slick-initialized').slick({
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
    
        findingsSlick = $('#findings-content').not('.slick-initialized').slick({
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

        insightsSlick = $('#insights-content').not('.slick-initialized').slick({
            infinite: false,
            nextArrow: `<div class="slick-button slick-next" style="color:`+white+`">
                            <i class="fas fa-chevron-right fa-lg"></i>
                        </div>`,
            prevArrow: `<div class="slick-button slick-prev" style="color:`+white+`">
                            <i class="fas fa-chevron-left fa-lg"></i>
                        </div>`,
            slidesToShow: 3,
            responsive: [
                {
                    breakpoint: screenExtraLarge,
                    settings: {
                        slidesToShow: 3
                    }
                },
                {
                    breakpoint: screenLarge,
                    settings: {
                        slidesToShow: 1
                    }
                }
            ]
        }).on('afterChange', function(){
            $('.slick-arrow').css('display', 'block');
            $('.slick-disabled').css('display', 'none');
        });*/

        // Initialize popovers
        /*$('[data-toggle="popover"]').data('placement', popPlacement);
        $('[data-toggle="popover"]').data('trigger', popTrigger);
        $('[data-toggle="popover"]').popover('update');*/
        /*$('[data-toggle="popover"]').popover('update', {
            placement: popPlacement,
            trigger: popTrigger
        });*/

    }else{
        $.fn.fullpage.reBuild();
        $("#console").append("<p>Full Page is false</p>");
    }  

}

function startAnimation(){

    //Scroll Animation
    controller = new ScrollMagic.Controller();
    controller_h = new ScrollMagic.Controller({vertical:false});

    $("#console").append("<p>Start Animation</p>");

    $('.section.fade').each(function(){
        // Create a scene for each project
        sectionFadeScene = new ScrollMagic.Scene({
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
    homeAnimation = new TimelineMax();
    firstLoad ? homeAnimation.delay(0.5) : homeAnimation.delay(2);
    homeAnimation.from(homeVideo, 1, {opacity:0});
    homeAnimation.from(homeTitle, 1, {'top':'-100px', opacity:0, ease:Power4.easeOut}, "-=0.5");
    homeAnimation.from(homeHR, 1, {width: '0%', left: '0px', ease:Cubic.easeOut}, "-=0.5");
    homeAnimation.from(homeSubtitle, 1, {'left':'-100px', opacity:0, ease:Power4.easeOut}, "-=0.5");
    homeScene = new ScrollMagic.Scene({
        triggerElement: 'body',
        triggerHook: 0.5
    })
    .setTween(homeAnimation)
    //.addIndicators({name: "Home"})
    .addTo(controller)
    .on("end", function(){
        firstLoad = false;
        $("#console").append("<p>Home Animation Done</p>");
    });

    /* Overview Animation */ 
    var overviewContent = '#section-overview',
        overviewTitle = $('#section-overview .heading h1'),
        overviewSubTitle = $('#section-overview .heading h4'),
        overviewHR = $('#section-overview hr'),
        overviewSlides = $('#section-overview #overview-content'),
        overviewSVGStroke = $('#section-overview svg #circle-stroke');
        overviewImage = $('#section-overview .overview-image img');
    overviewAnimation = new TimelineMax();
    firstLoad ? overviewAnimation.delay(1) : overAnimation.delay(0);
    overviewAnimation.from(overviewTitle, 1, {'top':'-100px', opacity:0, ease:Bounce.easeOut}, "-=0.5");
    overviewAnimation.from(overviewSubTitle, 1, {'left': '-100px', opacity:0, ease:Bounce.easeOut}, "-=0.5");
    overviewAnimation.from(overviewHR, 1, {width: '0%', left: '0px', ease:Cubic.easeOut}, "-=0.5");
    overviewAnimation.from(overviewSlides, 1, {'right': '-100px', opacity:0, ease:Power4.easeOut}, "-=0.5");
    overviewAnimation.add(TweenMax.to(overviewSVGStroke, 1, {strokeDashoffset: 0, ease:Linear.easeNone}), "-=1");
    overviewAnimation.from(overviewImage, 1, {opacity:0, ease:Power4.easeOut});
    overviewScene = new ScrollMagic.Scene({
        triggerElement: overviewContent,
        triggerHook: 0.5
    })
    .setTween(overviewAnimation)
    //.addIndicators({name: "Overview"})
    .addTo(controller)
    .on("end", function(){
        firstLoad = false;
        $("#console").append("<p>Overview Animation Done</p>");
    });

    /* Insights Animation */
    var insightsContent = '#section-insights',
        insightsTitle = $('#section-insights .heading h1'),
        insightsSlides = $('#section-insights .insight');
    insightsAnimation = new TimelineMax();
    firstLoad ? insightsAnimation.delay(1) : insightsAnimation.delay(0);
    insightsAnimation.from(insightsTitle, 1, {'top':'-100px', opacity:0, ease:Bounce.easeOut}, "-=0.5");
    insightsAnimation.staggerFromTo(insightsSlides, 1, {y:'110%', ease:Ease.easeOut}, {y:'0%', delay:0.5}, 0.1);
    insightsScene = new ScrollMagic.Scene({
        triggerElement: insightsContent,
        triggerHook: 0.5
    })
    .setTween(insightsAnimation)
    .addTo(controller)
    .on("end", function(){
        firstLoad = false;
        $("#console").append("<p>Insights Animation Done</p>");
    });

    /* Report Animation */
    var reportContent = '#section-report',
        reportTitle = $('#section-report .heading h1'),
        reportCopy = $('#section-report .report-copy'),
        reportForm = $('#section-report .report-form'),
        reportFormRows = $('#section-report .report-form .row');
    var reportController = mobile ? controller : controller_h    
    reportAnimation = new TimelineMax();
    firstLoad ? reportAnimation.delay(1) : reportAnimation.delay(0);
    reportAnimation.from(reportTitle, 1, {'top':'-100px', opacity:0, ease:Bounce.easeOut}, "-=0.5");
    reportAnimation.from(reportCopy, 1, {left:'-150%', ease:Back.easeInOut}, "-=0.5");
    reportAnimation.from(reportForm, 1, {opacity:0, ease:Cubic.easeInOut}, "-=0.5");
    reportAnimation.staggerFromTo(reportFormRows, 1, {x:'120%', ease:Back.easeInOut}, {x:'0%', delay:0}, 0.1);
    reportScene = new ScrollMagic.Scene({
        triggerElement: reportContent
    })
    .setTween(reportAnimation)
    .addTo(reportController)
    .on("end", function(){
        firstLoad = false;
        $("#console").append("<p>Report Animation Done</p>");
    });

    /* Key Findings Animation */
    var findingsContent = '#section-presentation',
        findingsTitle = $('#section-presentation .heading h1'),
        findingsSlides = $('#section-presentation #findings-content');
    findingsAnimation = new TimelineMax();
    firstLoad ? findingsAnimation.delay(1) : findingsAnimation.delay(0);
    findingsAnimation.from(findingsTitle, 1, {'top':'-100px', opacity:0, ease:Bounce.easeOut}, "-=0.5");
    findingsAnimation.from(findingsSlides, 1, {opacity:0}, "-=0.5");
    findingsScene = new ScrollMagic.Scene({
        triggerElement: findingsContent
    })
    .setTween(findingsAnimation)
    .addTo(controller)
    .on("end", function(){
        firstLoad = false;
        $("#console").append("<p>Findings Animation Done</p>");
    });

    /* Press Release Animation */
    var prContent = '#section-press-release',
        prTitle = $('#section-press-release .heading h1'),
        prEnglish = $('#section-press-release .english'),
        prArabic = $('#section-press-release .arabic');
    var prController = mobile ? controller : controller_h    
    prAnimation = new TimelineMax();
    firstLoad ? prAnimation.delay(1) : prAnimation.delay(0);
    prAnimation.from(prTitle, 1, {'top':'-100px', opacity:0, ease:Bounce.easeOut}, "-=0.5");
    prAnimation.from(prEnglish, 1, {left:'-100%', opacity:0, ease:Back.easeInOut}, "-=0.5");
    prAnimation.from(prArabic, 1, {right:'-100%', opacity:0, ease:Back.easeInOut}, "-=0.5");
    prScene = new ScrollMagic.Scene({
        triggerElement: prContent
    })
    .setTween(prAnimation)
    .addTo(prController)
    .on("end", function(){
        firstLoad = false;
        $("#console").append("<p>PR Animation Done</p>");
    });

    /* CPS Animation */
    var cpsContent = '#section-cps',
        cpsTitle = $('#section-cps .heading h1'),
        cpsCopy = $('#section-cps .cps-copy'),
        cpsForm = $('#section-cps .cps-form'),
        cpsFormRows = $('#section-cps .cps-form .row');
    cpsAnimation = new TimelineMax();
    firstLoad ? cpsAnimation.delay(1) : cpsAnimation.delay(0);
    cpsAnimation.from(cpsTitle, 1, {'top':'-100px', opacity:0, ease:Bounce.easeOut}, "-=0.5");
    cpsAnimation.from(cpsCopy, 1, {left:'-150%', ease:Back.easeInOut}, "-=0.5");
    cpsAnimation.from(cpsForm, 1, {opacity:0, ease:Cubic.easeInOut}, "-=0.5");
    cpsAnimation.staggerFromTo(cpsFormRows, 1, {x:'120%', ease:Back.easeInOut}, {x:'0%', delay:0}, 0.1);
    cpsScene = new ScrollMagic.Scene({
        triggerElement: cpsContent
    })
    .setTween(cpsAnimation)
    .addTo(controller)
    .on("end", function(){
        firstLoad = false;
        $("#console").append("<p>CPS Animation Done</p>");
    });

    /* Contact Us Animation */
    var contactUsContent = '#section-contact-us',
        contactUsTitle = $('#section-contact-us .heading h1'),
        contactUsForm = $('#section-contact-us .contact-form'),
        contactUsFormRows = $('#section-contact-us .contact-form .row');
    contactUsAnimation = new TimelineMax();
    firstLoad ? contactUsAnimation.delay(1) : contactUsAnimation.delay(0);
    contactUsAnimation.from(contactUsTitle, 1, {'top':'-100px', opacity:0, ease:Bounce.easeOut}, "-=0.5");
    contactUsAnimation.from(contactUsForm, 1, {opacity:0, ease:Cubic.easeInOut}, "-=0.5");
    contactUsAnimation.staggerFromTo(contactUsFormRows, 1, {x:'120%', ease:Back.easeInOut}, {x:'0%', delay:0}, 0.1);
    contactUsScene = new ScrollMagic.Scene({
        triggerElement: contactUsContent
    })
    .setTween(contactUsAnimation)
    .addTo(controller)
    .on("end", function(){
        firstLoad = false;
        $("#console").append("<p>Contact Us Animation Done</p>");
    });
}
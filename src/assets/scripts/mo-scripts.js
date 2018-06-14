//import { TweenMax, TimelineMax, TimelineLite } from "gsap";

var darkBlue = "#002337";
var mobNavBlue1 = "#173749";
var mobNavBlue2 = "#2e4b5b";
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

// ScrollMagic Variables
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

// Slick Variables
var slickCreated = false;
var overviewSlick;
var findingsSlick;
var insightsSlick;

var mobile = false;
var screenResizeCount = 0;
var resizeId;
var sliceRotation = [];
var sectorAngle;
var currentAnchor = "home";
var mobileNavRadius;
var touchStartX, touchStartY, touchMoveX, touchMoveY, currentRotation;
window.blockMenuHeaderScroll = false;

$(document).ready(function() {

    checkIE();

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

    var SVGsToInject = document.querySelectorAll('.svg-sprite');
    SVGInjector(SVGsToInject);
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
        setupPage();
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

        createCircularMenu({
            container: 'circularmenu',
            svgId: 'svg-menu',
            type: 'donut'
        });

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
        fpAutoScrolling = _ref.fpAutoScrolling;

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
                $("#scroll-initiator").click(function(){
                    console.log("clicked");
                    $.fn.fullpage.moveTo(2, 0);
                });
            },
            onLeave: function(index, nextIndex, direction){
                if( nextIndex%2 == 0 ){
                    socialIcons.css('color', darkBlue);
                    slickArrows.css('color', darkBlue);
                }else{
                    socialIcons.css('color', white);
                    slickArrows.css('color', white);
                }
            },
            afterLoad: function(anchorLink, index){
                console.log(anchorLink);

                currentAnchor = anchorLink;
                animateMobileWheel(currentAnchor);
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

    }else{
        $.fn.fullpage.reBuild();
        $("#console").append("<p>Full Page is false</p>");
    }  

}

function animateMobileWheel(anchor){
    for(var i=0; i<sliceRotation.length; i++){
        if(sliceRotation[i].link == anchor){
            var mobileNav = $('#circularmenu'),
                mobileNavName = $('#nav-name');
            var mobileNavTweenTurn = new TimelineMax({pause:true});
            var newRotation = (sliceRotation[i].deg + (sectorAngle/2)) - 90;
            currentRotation = -newRotation;
            $('#nav-name .title').html(sliceRotation[i].name);
            console.log("sliceRotation[i].link: "+sliceRotation[i].link);
            console.log("currentAnchor: "+currentAnchor);
            mobileNavTweenTurn.set(mobileNavName, {display: 'block', bottom:mobileNavRadius+10, opacity:0})
            mobileNavTweenTurn.to(mobileNav, 1, {rotation:-newRotation, transformOrigin:"center center", ease:Strong.easeOut});
            if(mobileNav.hasClass('active') && (sliceRotation[i].link != currentAnchor)){
                mobileNavTweenTurn.fromTo(mobileNavName, 1, {opacity: 0}, {opacity: 1}, "-=1");
            }else if(mobileNav.hasClass('active') && (sliceRotation[i].link == currentAnchor)){
                if(firstLoad){
                    mobileNavTweenTurn.fromTo(mobileNavName, 1, {opacity: 0}, {opacity: 1}, "-=1");
                    firstLoad = false;
                }
                mobileNavTweenTurn.fromTo(mobileNavName, 1, {opacity: 1}, {opacity: 1}, "-=1");
            }
        }
    }
}

function checkIE(){
    // Get IE or Edge browser version
    var version = detectIE();

    if (version === false) {
    console.log('<s>IE/Edge</s>');
    } else if (version >= 12) {
    console.log('Edge ' + version);
    } else {
    console.log('IE ' + version);
    }

    // add details to debug result
    console.log(window.navigator.userAgent);

    /**
     * detect IE
     * returns version of IE or false, if browser is not Internet Explorer
     */
    function detectIE() {
    var ua = window.navigator.userAgent;

    // Test values; Uncomment to check result …

    // IE 10
    // ua = 'Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.2; Trident/6.0)';
    
    // IE 11
    // ua = 'Mozilla/5.0 (Windows NT 6.3; Trident/7.0; rv:11.0) like Gecko';
    
    // Edge 12 (Spartan)
    // ua = 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.71 Safari/537.36 Edge/12.0';
    
    // Edge 13
    // ua = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/46.0.2486.0 Safari/537.36 Edge/13.10586';

    var msie = ua.indexOf('MSIE ');
    if (msie > 0) {
        // IE 10 or older => return version number
        return parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
    }

    var trident = ua.indexOf('Trident/');
    if (trident > 0) {
        // IE 11 => return version number
        var rv = ua.indexOf('rv:');
        return parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);
    }

    var edge = ua.indexOf('Edge/');
    if (edge > 0) {
        // Edge (IE 12+) => return version number
        return parseInt(ua.substring(edge + 5, ua.indexOf('.', edge)), 10);

        $('.overview-image svg').css('display', 'none');
    }

    // other browser
    return false;
    }
}

function createCircularMenu(_ref){
    var svgNS = "http://www.w3.org/2000/svg";
    var svgLinkNS = 'http://www.w3.org/1999/xlink';
    var element = _ref.container,
        svgId = _ref.svgId,
        type = _ref.type;

    // Using CSS
    /*var navRadius = $('#mobile-nav #navbar-items').width()/2.5;
    var navAngle = 0;
    var navRotation = 90;
    var navWidth = $('#mobile-nav #navbar-items').width();
    var navHeight = $('#mobile-nav #navbar-items').height();
    console.log("navWidth: "+navWidth);
    console.log("navHeight: "+navHeight);
    var navItemsNum = $("#mobile-nav #navbar-items .nav-item").length; 
    var navItemsAngleSize = (2*Math.PI)/navItemsNum;
    var navItemsRotation = 360/navItemsNum;

    $("#mobile-nav #navbar-items .nav-item").each(function(){
        var x = Math.round(navWidth/2 + navRadius * Math.cos(navAngle) - $(this).width()/2),
            y = Math.round(navHeight/2 + navRadius * Math.sin(navAngle) - $(this).height()/2);
        $(this).css({
            left: x + 'px',
            top: y + 'px',
            transform: 'rotate('+navRotation+'deg)'
        });
        $(this).children(".nav-link").css({
            transform: 'rotate('+ -navRotation +'deg)'
        });
        navAngle += navItemsAngleSize;
        navRotation += navItemsRotation;
        console.log("navRotation: "+navRotation);
        console.log("xPos: "+x);
        console.log("yPos: "+y);
    });*/

    // Using SVG
    var cmAngleofRotation = 0;
    var cmWidth = $( "#"+element ).width();
    var cmHeight = $( "#"+element ).height();
    var cmRadius = cmWidth/2;
    var cmInnerRadius = cmRadius-80;
    var cmCenterX = cmWidth/2;
    var cmCenterY = cmHeight/2;
    var cmItemsLength = $( "#"+element + " .nav-item").length;
    var cmAngleInDegrees = 360/cmItemsLength;
    var cmAngleInRadians = -cmAngleInDegrees * Math.PI / 180.0;
    var x = cmCenterX + cmRadius * Math.cos(cmAngleInRadians);
    var y = cmCenterY + cmRadius * Math.sin(cmAngleInRadians);
    var iconWidth = 20;
    var iconHeight = 20;
    var count = 0;
    sectorAngle = cmAngleInDegrees;
    mobileNavRadius = cmRadius;
    
    var svg = document.createElementNS(svgNS, "svg");
    svg.setAttribute('xmlns', svgNS);
    svg.setAttribute('xmlns:xlink', svgLinkNS);
    svg.setAttributeNS(null, 'width', cmWidth);
    svg.setAttributeNS(null, 'height', cmHeight);
    svg.setAttributeNS(null, 'viewBox', '0 0 '+cmWidth+' '+cmHeight);
    svg.setAttributeNS(null, 'id', svgId);

    document.getElementById(element).appendChild(svg);

    var svggroup = document.createElementNS(svgNS, "g");
    svggroup.setAttributeNS(null, 'id', 'slice-container');

    document.getElementById(svgId).appendChild(svggroup);

    $("#"+element + " .nav-item").each(function(index){

        var svgIcon = $(this).find('.nav-link');
        var svgIconID = svgIcon.attr('data-icon');
        var anchor = svgIcon.attr('data-anchor');
        var content = svgIcon.attr('data-content');
        index += 1;

        var svglink = document.createElementNS(svgNS, 'a');
        svglink.setAttributeNS(null, 'id', 'svg-link-'+index);
        svglink.setAttributeNS(null, 'class', 'slice');
        svglink.setAttributeNS(null, 'data-menuanchor', '#'+anchor);
        svglink.setAttributeNS(svgLinkNS, 'xlink:href', '#'+anchor);
        svglink.setAttributeNS(svgLinkNS, 'xlink:title', content);
        svglink.setAttributeNS(null, 'role', 'link');
        svglink.setAttributeNS(null, 'data-svg-origin', cmRadius+" "+cmRadius);
        svglink.setAttributeNS(null, 'transform', 'rotate('+cmAngleofRotation+', '+cmRadius+', '+cmRadius+')');

        document.getElementById('slice-container').appendChild(svglink);

        var svgpath = document.createElementNS(svgNS, "path");
        svgpath.setAttributeNS(null, 'id', 'svg-path-'+index);
        index%2 == 0 ? svgpath.setAttributeNS(null, 'fill', mobNavBlue1) : svgpath.setAttributeNS(null, 'fill', mobNavBlue2);        
        svgpath.setAttributeNS(null, 'fill-opacity', '0.8');
        svgpath.setAttributeNS(null, 'stroke', '#eee');
        svgpath.setAttributeNS(null, 'stroke-opacity', '0.3');
        svgpath.setAttributeNS(null, 'stroke-width', '1');
        if(type == "pie"){
            svgpath.setAttributeNS(null, 'd', 'M'+cmCenterX+','+cmCenterY+' l'+cmRadius+',0 A'+cmRadius+','+cmRadius+' 0 0,0 '+x+','+y+' z');
        }else if (type == "donut"){
            svgpath.setAttributeNS(null, 'd', annularSector(cmCenterX, cmCenterY, 0, cmAngleInDegrees, cmInnerRadius, cmRadius));
        }
        //svgpath.setAttribute('transform', 'rotate('+cmAngleofRotation+', '+cmRadius+', '+cmRadius+')');

        document.getElementById('svg-link-'+index).appendChild(svgpath);

        //var cmAngleIconRotation = (cmAngleInDegrees/2)+(iconWidth/4);
        var cmPieAngleRotation = 45+(cmAngleInDegrees/2);
        var cmDonutAngleRotation = (cmAngleInDegrees/2)-90;
        var xPos = (cmWidth/2)-(iconWidth/2);
        var yPos = (cmHeight/2)-(iconHeight/2);
        console.log("xPos: "+xPos);
        console.log("yPos: "+yPos);
        var svgicon = document.createElementNS(svgNS, "use");
        svgicon.setAttributeNS(null, 'id', 'svg-icon-'+index);
        svgicon.setAttributeNS(svgLinkNS, 'xlink:href', '#'+svgIconID);
        svgicon.setAttributeNS(svgLinkNS, 'xlink:href', '#'+svgIconID);
        svgicon.setAttributeNS(null, 'width', iconWidth);
        svgicon.setAttributeNS(null, 'height', iconHeight);
        svgicon.setAttributeNS(null, 'fill', white);
        svgicon.setAttributeNS(null, 'x', xPos); //35
        svgicon.setAttributeNS(null, 'y', yPos); //95
        if(type == "pie"){
            svgicon.setAttribute('transform', 'rotate('+cmPieAngleRotation+', '+svgpath.getPointAtLength(0).x+', '+svgpath.getPointAtLength(0).y+') translate(0,-100)');
        }else if(type == "donut"){
            svgicon.setAttribute('transform', 'rotate('+cmDonutAngleRotation+', '+xPos+', '+yPos+') translate(-15,-90)');
        }

        document.getElementById('svg-link-'+index).appendChild(svgicon);

        sliceRotation.push({
            link: anchor,
            deg: cmAngleofRotation,
            name: content
        });
        
        cmAngleofRotation += cmAngleInDegrees;

        if(count >= cmItemsLength-1){
            $('#'+element).html(svg);
            $('#'+element).css('margin-left', -cmRadius);

            var mobileNavButton = $('#mobile-nav #nav-container'),
                mobileNavButtonIcon = $('#mobile-nav #nav-container button'),
                mobileNavName = $('#nav-name'),
                mobileNav = $('#circularmenu'),
                mobileNavSlices = $('#circularmenu a.slice'),
                menuToggleBars = $('#mobile-nav #menu-toggle'),
                menuToggleClose = $('#mobile-nav #menu-toggle-close');

            // var mobileNavTweenFirstTurn = new TimelineMax({pause:true});
            // var newRotation = (0 + (sectorAngle/2)) - 90;
            // mobileNavTweenFirstTurn.to(mobileNav, 1, {rotation:-newRotation, transformOrigin:"center center"});
                        
            var mobileNavTweenShow = new TimelineMax({pause:true});
            mobileNavTweenShow.set(mobileNav, {rotation:-sectorAngle, bottom: -cmRadius});
            mobileNavTweenShow.to(mobileNavButton, 0.5, {'margin-bottom': '-50px'});
            mobileNavTweenShow.to(mobileNavButtonIcon, 0.5, {'margin-top': '0px'}, '-=0.5');
            mobileNavTweenShow.fromTo(mobileNav, 1, {opacity:0}, {opacity:1}, '-=0.5');
            mobileNavTweenShow.fromTo(mobileNavName, 0.5, {bottom:-50}, {bottom:mobileNavRadius+10}, '-=1');
            mobileNavTweenShow.to(menuToggleBars, 1, {opacity:0, 'margin-bottom':-100, ease:Strong.easeOut}, '-=1');
            mobileNavTweenShow.to(menuToggleClose, 1, {opacity:1, 'margin-bottom':5, 'display':'block', ease:Strong.easeOut}, '-=1');
            mobileNavTweenShow.staggerFrom(mobileNavSlices, 1, {
                rotation:0,
                svgOrigin: cmCenterX+" "+cmCenterY,
                ease: 'Strong.easeOut'
            }, 0.1, '-=1', function(){
                animateMobileWheel(currentAnchor);
            });

            if(mobileNav.hasClass('active')){
                mobileNavTweenShow.play();
            }else{
                mobileNavTweenShow.reverse();
            }

            $('.navbar-toggler').on('click', function(){
                mobileNav.toggleClass('active');
                if(mobileNav.hasClass('active')){
                    mobileNavTweenShow.play();
                }else{
                    mobileNavTweenShow.reverse();
                }
                
            });
        }else{
            console.log("sliceRotation: "+sliceRotation[count].deg);
            console.log("sliceRotation: "+sliceRotation[count].link);
            count++;
        }
    });

    document.getElementById('circularmenu').addEventListener('touchstart', function(event) {
        var touch = event.touches[0];
        //$('#console').html(touch.pageX,touch.pageY+'<br>');
        blockMenuHeaderScroll = true;
        touchStartX = touch.pageX;
        touchStartY = touch.pageY;
        console.log('start: '+touch.pageX+','+touch.pageY);
    }, false);
    document.getElementById('circularmenu').addEventListener('touchmove', function(event) {
        var touch = event.touches[0];
        touchMoveX = touch.pageX;
        touchMoveY = touch.pageY;
        if (blockMenuHeaderScroll)
        {
            $('body').css('overflow', 'hidden');
        }
        console.log('currentRotation: '+currentRotation);
        if(touchMoveX < touchStartX){
            currentRotation -= 5;
            $('#circularmenu').css('transform', 'rotate('+currentRotation+'deg)');
            touchStartX = touchMoveX;
            console.log('animate to left');
        }else{
            currentRotation += 5;
            $('#circularmenu').css('transform', 'rotate('+currentRotation+'deg)');
            touchStartX = touchMoveX;
            console.log('animate to right');
        }
        //$('#console').append(touch.pageX,touch.pageY+'<br>');
        console.log('move: '+touch.pageX+','+touch.pageY);
    }, false);
    document.getElementById('circularmenu').addEventListener('touchend', function(event) {
        blockMenuHeaderScroll = false;
        $('body').css('overflow', 'scroll');
        //$('#console').append(touch.pageX,touch.pageY+'<br>');
        console.log('touch ended');

    }, false);
}


function deg2rad(deg) {
	return deg * Math.PI / 180;
}

function annularSector(centerX, centerY, startAngle, endAngle, innerRadius, outerRadius) {
	startAngle = deg2rad(startAngle + 180);
	endAngle = deg2rad(endAngle + 180);
	
	var p = [
        [centerX + innerRadius * Math.cos(startAngle), centerY + innerRadius * Math.sin(startAngle)],
        [centerX + outerRadius * Math.cos(startAngle), centerY + outerRadius * Math.sin(startAngle)],
        [centerX + outerRadius * Math.cos(endAngle), centerY + outerRadius * Math.sin(endAngle)],
        [centerX + innerRadius * Math.cos(endAngle), centerY + innerRadius * Math.sin(endAngle)]
	];
	
    var angleDiff = endAngle - startAngle,
        largeArc = (angleDiff % (Math.PI * 2)) > Math.PI ? 1 : 0;
	
	var commands = [];
	
	commands.push("M" + p[0].join());
	commands.push("L" + p[1].join());
	commands.push("A" + [outerRadius, outerRadius].join() + " 0 " + largeArc + " 1 " + p[2].join());
	commands.push("L" + p[3].join());
	commands.push("A" + [innerRadius, innerRadius].join() + " 0 " + largeArc + " 0 " + p[0].join());
	commands.push("z");
	
	return commands.join(" ");
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
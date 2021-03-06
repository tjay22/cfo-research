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
var screenOrientation;
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
var mobilePortrait = false;
var mobileLandscape = false;
var screenResizeCount = 0;
var resizeId;
var sliceRotation = [];
var sectorAngle;
var currentAnchor = "home";
var currentRotation = 0;
var mobileNavRadius;
var touchStartX, touchStartY, touchMoveX, touchMoveY, rotationStopPoint;

window.onorientationchange = function() { window.location.reload(); };

$(document).ready(function() {

    var preload = new createjs.LoadQueue();
    //preload.addEventListener("complete", filesLoaded);
    preload.loadFile("assets/icons/fontawesome-all.min.js");
    preload.loadFile("assets/jpg/introduction.jpg");
    preload.loadFile("assets/jpg/overview.jpg");
    preload.loadFile("assets/png/logo-amex.png");
    preload.loadFile("assets/infographics/cfo_research.jpg");
    preload.loadFile("assets/infographics/economic_growth.jpg");
    preload.loadFile("assets/infographics/employment_trends_2018.jpg");
    preload.loadFile("assets/infographics/next_gen_technologies.jpg");
    preload.loadFile("assets/infographics/risk_and_disruption.jpg");
    preload.loadFile("assets/infographics/spending_and_investment_plans_2018.jpg");

    handleFileComplete();

});

function handleFileComplete() {

    setTimeout(function(){ $('#preloader').fadeOut(1000); }, 3000);

    checkIE();

    $(".btn-infograph").click(function () {
        var imgURL = $(this).data('content');
        var imgString = '<img src="'+imgURL+'" style="max-width:100%;">';
        $('#infograph_modal .modal-body .modal-image').html(imgString);
        $('#infograph_modal').modal('show');
    })
    

    screenWidth = $(window).width();
    screenHeight = $(window).height();
    prevScreenWidth = screenWidth;
    //console.log("<p>Document Ready: W("+screenWidth + ") x H(" + screenHeight + ")</p>");

    (screenWidth > screenHeight) ? screenOrientation = "landscape" : screenOrientation = "portrait";

    (screenOrientation == "landscape" && screenHeight < screenSmall) ? mobileLandscape = true : mobileLandscape = false;

    (screenOrientation == "portrait" && screenWidth < screenSmall) ? mobilePortrait = true : mobilePortrait = false;

    (mobileLandscape || mobilePortrait) ? mobile = true : mobile = false;

    socialIcons = $("#social-icons .nav-link");
    slickArrows = $(".slick-arrow");

    var SVGsToInject = document.querySelectorAll('.svg-sprite');
    SVGInjector(SVGsToInject);
    setupPage();
}

$( window ).resize(function() {

    screenWidth = $(window).width();
    screenHeight = $(window).height();
    (screenWidth > screenSmall) ? mobile = false : mobile = true;

    if(!mobile && screenWidth != prevScreenWidth){
        clearTimeout(resizeId);
        resizeId = setTimeout(function(){ 
            screenResizeCount += 1;
            screenWidth = window.outerWidth;
            screenHeight = window.outerHeight;
            $.fn.fullpage.destroy('all');
            fullpageCreated = false;
            setupPage();
        }, 1000);
    }
    if(mobile && screenResizeCount > 0){
        setupPage();
    }
});

function setupPage(){

    if(mobileLandscape){

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
            popTrigger: 'click'
        });

        createLandscapeMenu({
            container: 'main-nav'
        });
        $('[data-toggle="popover"]').popover({
            placement : 'top',
            trigger : 'hover'
        });

    }
    if(mobilePortrait){

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
    }
    if(!mobile){

        $('[data-toggle="popover"]').popover({
            placement : 'left',
            trigger : 'hover'
        });

        $('.mobile').css('display', 'none');
        $('.desktop').css('display', 'block');

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
        }, 0.1);

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
                    startAnimation();
                    scrollMagicCreated = true;                    
                }else{
                    startAnimation();
                }
                $("#scroll-initiator").click(function(){
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
                currentAnchor = anchorLink;
                animateMobileWheel(currentAnchor);
            }
        });
        
        $.fn.fullpage.moveTo(1, 0);
        fullpageCreated = true;

        overviewSlick = $('#overview-content').not('.slick-initialized').slick({
            infinite: false,
            nextArrow: "<div class=\"slick-button slick-next\" style=\"color:inherit;\"> \n <i class=\"fas fa-chevron-right fa-lg\"></i> \n </div>",
            prevArrow: "<div class=\"slick-button slick-prev\" style=\"color:inheirt;\"> \n <i class=\"fas fa-chevron-left fa-lg\"></i> \n </div>"
        }).on('afterChange', function () {
            $('.slick-arrow').css('display', 'block');
            $('.slick-disabled').css('display', 'none');
        });

        findingsSlick = $('#findings-content').not('.slick-initialized').slick({
            infinite: false,
            nextArrow: "<div class=\"slick-button slick-next\" style=\"color:inherit;\"> \n <i class=\"fas fa-chevron-right fa-lg\"></i> \n </div>",
            prevArrow: "<div class=\"slick-button slick-prev\" style=\"color:inherit;\"> \n <i class=\"fas fa-chevron-left fa-lg\"></i> \n </div>"
        }).on('afterChange', function () {
            $('.slick-arrow').css('display', 'block');
            $('.slick-disabled').css('display', 'none');
        });

        insightsSlick = $('#insights-content').not('.slick-initialized').slick({
            infinite: false,
            nextArrow: "<div class=\"slick-button slick-next\" style=\"color:inherit;\"> \n <i class=\"fas fa-chevron-right fa-lg\"></i> \n </div>",
            prevArrow: "<div class=\"slick-button slick-prev\" style=\"color:inherit;\"> \n <i class=\"fas fa-chevron-left fa-lg\"></i> \n </div>",
            slidesToShow: 3,
            responsive: [{
                breakpoint: screenExtraLarge,
                settings: {
                    slidesToShow: 3
                }
            }, {
                breakpoint: screenMedium,
                settings: {
                    slidesToShow: 2
                }
            }, {
                breakpoint: screenSmall,
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
    }  

}

function animateMobileWheel(anchor){
    for(var i=0; i<sliceRotation.length; i++){
        if(sliceRotation[i].link == anchor){
            var mobileNav = $('#circularmenu'),
                mobileNavName = $('#nav-name');
            var mobileNavTweenTurn = new TimelineMax({pause:true});
            var newRotation = sliceRotation[i].stoppoint;
            $('#nav-name .title').html(sliceRotation[i].name);
            mobileNavTweenTurn.set(mobileNavName, {display: 'block', bottom:mobileNavRadius+10, opacity:0})
            mobileNavTweenTurn.fromTo(mobileNav, 1, {rotation:currentRotation}, {directionalRotation:newRotation+"_short", ease:Strong.easeOut});
            if(mobileNav.hasClass('active') && (sliceRotation[i].link != currentAnchor)){
                mobileNavTweenTurn.fromTo(mobileNavName, 1, {opacity: 0}, {opacity: 1}, "-=1");
            }else if(mobileNav.hasClass('active') && (sliceRotation[i].link == currentAnchor)){
                if(firstLoad){
                    mobileNavTweenTurn.fromTo(mobileNavName, 1, {opacity: 0}, {opacity: 1}, "-=1");
                    firstLoad = false;
                }
                mobileNavTweenTurn.fromTo(mobileNavName, 1, {opacity: 1}, {opacity: 1}, "-=1");
                currentRotation = newRotation;
            }
            
        }
    }
}

function checkIE(){
    // Get IE or Edge browser version
    var version = detectIE();

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
        styleForIE();
        modalFixForIE();
    }

    var trident = ua.indexOf('Trident/');
    if (trident > 0) {
        // IE 11 => return version number
        styleForIE();
        modalFixForIE();
    }

    var edge = ua.indexOf('Edge/');
    if (edge > 0) {

        styleForIE();
    }

    // other browser
    return false;
    }
}

function modalFixForIE(){
    $('#infograph_modal').on('shown.bs.modal', function(){
        var imgHeight = $('#infograph_modal .modal-image img').height();
        $('#infograph_modal .modal-body').height(imgHeight);
        $('#infograph_modal').modal('handleUpdate');
    });
}

function styleForIE(){
    $('body, .popover, .popover-body, .btn').css({
        'font-family': 'BentonSansLight'
    });
    $('.overview-image').css({
        '-webkit-clip-path': 'polygon(0 0, 100% 0, 100% 100%, 0% 100%)',
        'clip-path': 'polygon(0 0, 100% 0, 100% 100%, 0% 100%)'
    });
    $('.overview-image svg').css({
        display:'none'
    });
    $('.nav-highlights .nav-item').css({
        width: '70px',
        'margin-left': '20px',
        'margin-right': '20px'
    });
    $('#section-presentation .inner-slide img').css({
        'max-width': '70%'
    });
}

function createLandscapeMenu(_ref){
    var element = _ref.container;
    var navLSItemNum = $( "#"+element+" .nav-item").length;
    var navLSWidth = screenWidth / navLSItemNum;
    $( "#"+element+" .nav-item").css({
        width: navLSWidth
    });
    $( "#"+element+" .nav-item .nav-link").css({
        'text-align': 'center'
    });
}

function createCircularMenu(_ref){
    var svgNS = "http://www.w3.org/2000/svg";
    var svgLinkNS = 'http://www.w3.org/1999/xlink';
    var element = _ref.container,
        svgId = _ref.svgId,
        type = _ref.type;

    // Using SVG
    var cmAngleofRotation = 0;
    var cmWidth = $( "#"+element ).width();
    var cmHeight = $( "#"+element ).height();
    var cmRadius = cmWidth/2;
    var cmInnerRadius = cmRadius-80;
    var cmCenterX = cmWidth/2;
    var cmCenterY = cmHeight/2;
    var cmItemsLength = $( "#"+element+" .nav-item").length;
    var cmAngleInDegrees = 360/cmItemsLength;
    var cmAngleInRadians = -cmAngleInDegrees * Math.PI / 180.0;
    var x = cmCenterX + cmRadius * Math.cos(cmAngleInRadians);
    var y = cmCenterY + cmRadius * Math.sin(cmAngleInRadians);
    var iconWidth = 20;
    var iconHeight = 20;
    var count = 0;
    sectorAngle = cmAngleInDegrees;
    mobileNavRadius = cmRadius;
    rotationStopPoint = (sectorAngle/2)-90;
    
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

        var cmPieAngleRotation = 45+(cmAngleInDegrees/2);
        var cmDonutAngleRotation = (cmAngleInDegrees/2)-90;
        var xPos = (cmWidth/2)-(iconWidth/2);
        var yPos = (cmHeight/2)-(iconHeight/2);
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

        var stopPointTemp = -(cmAngleofRotation + rotationStopPoint);
        sliceRotation.push({
            link: anchor,
            deg: cmAngleofRotation,
            name: content,
            stoppoint: stopPointTemp
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
                menuToggleBars = $('#nav-container #menu-toggle'),
                menuToggleClose = $('#nav-container #menu-toggle-close');
                        
            var mobileNavTweenShow = new TimelineMax({pause:true});
            mobileNavTweenShow.set(mobileNav, {rotation:-sectorAngle, bottom: -cmRadius});
            mobileNavTweenShow.to(mobileNavButton, 0.5, {'margin-bottom': '-50px'});
            mobileNavTweenShow.to(mobileNavButtonIcon, 0.5, {'margin-top': '0px'}, '-=0.5');
            mobileNavTweenShow.fromTo(mobileNav, 1, {opacity:0}, {opacity:1}, '-=0.5');
            mobileNavTweenShow.fromTo(mobileNavName, 0.5, {bottom:-50}, {bottom:mobileNavRadius+10}, '-=1');
            mobileNavTweenShow.staggerFrom(mobileNavSlices, 1, {
                rotation:0,
                svgOrigin: cmCenterX+" "+cmCenterY,
                ease: 'Strong.easeOut'
            }, 0.1, '-=1', function(){
                animateMobileWheel(currentAnchor);
            });

            if(mobileNav.hasClass('active')){
                $('.navbar-toggler').addClass('clicked');
                mobileNavTweenShow.play();
            }else{
                $('.navbar-toggler').removeClass('clicked');
                mobileNavTweenShow.reverse();
                currentRotation = 0;
            }

            $('.navbar-toggler').on('click', function(){
                mobileNav.toggleClass('active');
                if(mobileNav.hasClass('active')){
                    $('#icon-bars').addClass('clicked');
                    mobileNavTweenShow.play();
                    window.document.body.addEventListener('touchstart', rotateStart, false);
                    window.document.body.addEventListener('touchmove', rotateMove, false);
                    window.document.body.addEventListener('touchend', rotateEnd, false);
                }else{
                    $('#icon-bars').removeClass('clicked');
                    mobileNavTweenShow.reverse();
                    window.document.body.removeEventListener('touchstart', rotateStart, false);
                    window.document.body.removeEventListener('touchmove', rotateMove, false);
                    window.document.body.removeEventListener('touchend', rotateEnd, false);
                    currentRotation = 0;
                }
                
            });
        }else{
            count++;
        }
    });
}

var rotateStart = function(event){
    var touch = event.touches[0];
    touchStartX = touch.pageX;
    touchStartY = touch.pageY;
}
var rotateMove = function(event){
    var touch = event.touches[0];
    touchMoveX = touch.pageX;
    if(touchMoveX < touchStartX){
        currentRotation -= 5;
        (currentRotation > -(rotationStopPoint)) ? currentRotation -= 360 : currentRotation = currentRotation;
        (currentRotation < -(360+rotationStopPoint)) ? currentRotation += 360  : currentRotation = currentRotation;
        $('#circularmenu').css('transform', 'rotate('+currentRotation+'deg)');
        for(var j=0; j<sliceRotation.length; j++){
            $('#nav-name .title').html(checkTitle(j, "left"));
        }
        touchStartX = touchMoveX;
    }else{
        currentRotation += 5;
        (currentRotation > -(rotationStopPoint)) ? currentRotation -= 360 : currentRotation = currentRotation;
        (currentRotation < -(360+rotationStopPoint)) ? currentRotation += 360  : currentRotation = currentRotation;
        $('#circularmenu').css('transform', 'rotate('+currentRotation+'deg)');
        for(var j=0; j<sliceRotation.length; j++){
            $('#nav-name .title').html(checkTitle(j, "right"));
        }
        touchStartX = touchMoveX;
    }
}
var rotateEnd = function(event){}

function checkTitle(index, dir){
    var k = index;
    k += 1;
    (k>sliceRotation.length-1) ? k = 0 : k=k;
    if(currentRotation <= sliceRotation[index].stoppoint+(sectorAngle/2)  && dir=="left"){
        return sliceRotation[index].name;
    }
    if(currentRotation <= sliceRotation[index].stoppoint+(sectorAngle/2)  && dir=="right"){
        return sliceRotation[index].name;
    }
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

    $('.section.fade').each(function(){
        // Create a scene for each project
        sectionFadeScene = new ScrollMagic.Scene({
            triggerElement: this,
            triggerHook: 0.8
        })
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
    homeAnimation.from(homeVideo, 1, {opacity:0});
    homeAnimation.from(homeTitle, 1, {'top':'-100px', opacity:0, ease:Power4.easeOut}, "-=0.5");
    homeAnimation.from(homeHR, 1, {width: '0%', left: '0px', ease:Cubic.easeOut}, "-=0.5");
    homeAnimation.from(homeSubtitle, 1, {'left':'-100px', opacity:0, ease:Power4.easeOut}, "-=0.5");
    homeScene = new ScrollMagic.Scene({
        triggerElement: 'body',
        triggerHook: 0.5
    })
    .setTween(homeAnimation)
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
        overviewImage = $('#section-overview .overview-image img');
    overviewAnimation = new TimelineMax();
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
    .addTo(controller)
    .on("end", function(){
        firstLoad = false;
    });

    /* Insights Animation */
    var insightsContent = '#section-insights',
        insightsTitle = $('#section-insights .heading h1'),
        insightsSlides = $('#section-insights .insight');
    insightsAnimation = new TimelineMax();
    insightsAnimation.from(insightsTitle, 1, {'top':'-100px', opacity:0, ease:Bounce.easeOut}, "-=0.5");
    insightsAnimation.staggerFromTo(insightsSlides, 1, {y:'110%', ease:Ease.easeOut}, {y:'0%', delay:0}, 0.1);
    insightsScene = new ScrollMagic.Scene({
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
    var reportController = mobile ? controller : controller_h    
    reportAnimation = new TimelineMax();
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
    });

    /* Key Findings Animation */
    var findingsContent = '#section-presentation',
        findingsTitle = $('#section-presentation .heading h1'),
        findingsSlides = $('#section-presentation #findings-content');
    findingsAnimation = new TimelineMax();
    findingsAnimation.from(findingsTitle, 1, {'top':'-100px', opacity:0, ease:Bounce.easeOut}, "-=0.5");
    findingsAnimation.from(findingsSlides, 1, {opacity:0}, "-=0.5");
    findingsScene = new ScrollMagic.Scene({
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
        prButtons = $('#section-press-release .buttons');
    var prController = mobile ? controller : controller_h    
    prAnimation = new TimelineMax();
    prAnimation.from(prTitle, 1, {'top':'-100px', opacity:0, ease:Bounce.easeOut}, "-=0.5");
    prAnimation.from(prEnglish, 1, {left:'-100%', opacity:0, ease:Back.easeInOut}, "-=0.5");
    prAnimation.from(prButtons, 1, {right:'-100%', opacity:0, ease:Back.easeInOut}, "-=0.5");
    prScene = new ScrollMagic.Scene({
        triggerElement: prContent
    })
    .setTween(prAnimation)
    .addTo(prController)
    .on("end", function(){
        firstLoad = false;
    });

    /* CPS Animation */
    var cpsContent = '#section-cps',
        cpsTitle = $('#section-cps .heading h1'),
        cpsCopy = $('#section-cps .cps-copy'),
        cpsForm = $('#section-cps .cps-form'),
        cpsFormRows = $('#section-cps .cps-form .row');
    cpsAnimation = new TimelineMax();
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
    });

    /* Contact Us Animation */
    var contactUsContent = '#section-contact-us',
        contactUsTitle = $('#section-contact-us .heading h1'),
        contactUsForm = $('#section-contact-us .contact-form'),
        contactUsFormRows = $('#section-contact-us .contact-form .row');
    contactUsAnimation = new TimelineMax();
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
    });
}
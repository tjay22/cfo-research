import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { DataService } from './../shared/data.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class NavigationComponent implements OnInit {

  links = [];
  linksMobile = [];
  screenWidth;
  screenHeight;
  screenOrientation;
  desktop = true;
  mobile = false;
  mobileLandscape = false;

  constructor(private data:DataService) {
    this.links = [
      { content: 'Home', icon: 'fa-home', linkhref: '#home', anchor: 'home'},
      { content: 'Overview', icon: 'fa-eye', linkhref: '#overview', anchor: 'overview'},
      { content: 'Insights', icon: 'fa-chart-line', linkhref: '#insights', anchor: 'insights'},
      { content: 'Press Information', icon: 'fa-briefcase', linkhref: '#press-information', anchor: 'press-information'},
      { content: 'Corporate Payment Solutions', icon: 'fa-credit-card', linkhref: '#corporate-payment-solutions', anchor: 'corporate-payment-solutions'},
      { content: 'Contact Us', icon: 'fa-envelope', linkhref: '#contact-us', anchor: 'contact-us'}
    ];

    this.linksMobile = [
      { content: 'Home', icon: 'fa-home', linkhref: '#home', anchor: 'home', svgicon: 'home'},
      { content: 'Overview', icon: 'fa-eye', linkhref: '#overview', anchor: 'overview', svgicon: 'eye'},
      { content: 'Insights', icon: 'fa-chart-line', linkhref: '#insights', anchor: 'insights', svgicon: 'chart-line'},
      { content: 'Report', icon: 'fa-file', linkhref: '#report', anchor: 'report', svgicon: 'file'},
      { content: 'Press Information', icon: 'fa-briefcase', linkhref: '#press-information', anchor: 'press-information', svgicon: 'briefcase'},
      { content: 'Press Release', icon: 'fa-bullhorn', linkhref: '#press-release', anchor: 'press-release', svgicon: 'bullhorn'},
      { content: 'Corporate Payment Solutions', icon: 'fa-credit-card', linkhref: '#corporate-payment-solutions', anchor: 'corporate-payment-solutions', svgicon: 'credit-card'},
      { content: 'Contact Us', icon: 'fa-envelope', linkhref: '#contact-us', anchor: 'contact-us', svgicon: 'envelope'}
    ];

  }

  ngOnInit() {
    this.data.currentScreenWidth.subscribe((value) => this.screenWidth = value );
    this.data.currentScreenHeight.subscribe((value) => this.screenHeight = value );
    this.data.currentScreenOrientation.subscribe((value) => this.screenOrientation = value );
    this.initNavigation();
  }

  onResize(event){
    //console.log(event.target);
    this.screenWidth = event.target.innerWidth;
    this.screenHeight = event.target.innerHeight;
    this.data.changeScreenWidth(this.screenWidth);
    this.data.changeScreenHeight(this.screenHeight);
    this.initNavigation();
  }

  initNavigation(){
    if(this.screenWidth < this.screenHeight){
      this.data.changeOrientation("portrait");
    }else{
      this.data.changeOrientation("landscape");
    }

    if((this.screenOrientation == "landscape" && this.screenHeight < this.data.xs) || (this.screenOrientation == "portrait" && this.screenWidth < this.data.xs)){
      this.desktop = false;
      this.mobile = true;
      this.data.desktop = false;
      this.data.mobile = true;
    }else{
      this.desktop = true;
      this.mobile = false;
      this.data.desktop = true;
      this.data.mobile = false;
    }
    
    if(this.screenOrientation == "landscape" && this.screenHeight < this.data.xs){
      this.mobileLandscape = true;
    }
  }

}

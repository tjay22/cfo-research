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
  desktop = true;
  mobile = false;
  xs = 576;
  sm = 768;
  md = 992;
  lg = 1200;

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
    console.log("Navigation onInit Width: "+this.screenWidth);
    console.log("Navigation onInit Height: "+this.screenHeight);
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
    if (this.screenWidth > this.xs){
      this.desktop = true;
      this.mobile = false;
    }else{
      this.desktop = false;
      this.mobile = true;
    }
  }

}

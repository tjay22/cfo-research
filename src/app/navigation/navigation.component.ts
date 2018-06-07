import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class NavigationComponent implements OnInit {

  links = [];
  linksMobile = [];

  constructor() {
    this.links = [
      { content: 'Home', icon: 'fa-home', linkhref: '#home', anchor: 'home'},
      { content: 'Overview', icon: 'fa-eye', linkhref: '#overview', anchor: 'overview'},
      { content: 'Insights', icon: 'fa-chart-line', linkhref: '#insights', anchor: 'insights'},
      { content: 'Press Kit', icon: 'fa-briefcase', linkhref: '#press-kit', anchor: 'press-kit'},
      { content: 'Corporate Payment Solutions', icon: 'fa-credit-card', linkhref: '#corporate-payment-solutions', anchor: 'corporate-payment-solutions'},
      { content: 'Contact Us', icon: 'fa-envelope', linkhref: '#contact-us', anchor: 'contact-us'}
    ];

    this.linksMobile = [
      { content: 'Home', icon: 'fa-home', linkhref: '#home', anchor: 'home'},
      { content: 'Overview', icon: 'fa-eye', linkhref: '#overview', anchor: 'overview'},
      { content: 'Insights', icon: 'fa-chart-line', linkhref: '#insights', anchor: 'highlights'},
      { content: 'Report', icon: 'fa-document', linkhref: '#report', anchor: 'report'},
      { content: 'Press Kit', icon: 'fa-briefcase', linkhref: '#press-kit', anchor: 'press-kit'},
      { content: 'Press Release', icon: 'fa-bullhorn', linkhref: '#press-release', anchor: 'press-release'},
      { content: 'Corporate Payment Solutions', icon: 'fa-credit-card', linkhref: '#corporate-payment-solutions', anchor: 'corporate-payment-solutions'},
      { content: 'Contact Us', icon: 'fa-envelope', linkhref: '#contact-us', anchor: 'contact-us'}
    ];

  }

  ngOnInit() {
  }

}

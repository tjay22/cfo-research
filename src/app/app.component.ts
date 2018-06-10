import { Component, OnInit } from '@angular/core';
import { DataService } from './shared/data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  title = 'American Express CFO Research';
  fpsections;
  fpslides;
  screenWidth;
  screenHeight;
  desktop = true;
  mobile = false;
  xs = 576;
  sm = 768;
  md = 992;
  lg = 1200;

  constructor(private data:DataService){

    this.data.currentScreenWidth.subscribe((value) => this.screenWidth = value );
    this.data.currentScreenHeight.subscribe((value) => this.screenHeight = value );
    this.initFullPageSections();

  }

  ngOnInit(){
    this.initFullPageSections();
  }

  onResize(event){
    //console.log(event.target);
    this.screenWidth = event.target.innerWidth;
    this.screenHeight = event.target.innerHeight;
    this.data.changeScreenWidth(this.screenWidth);
    this.data.changeScreenHeight(this.screenHeight);
    this.initFullPageSections();
  }

  initFullPageSections(){
    //console.log('screenWidth'+this.screenWidth);
    if (this.screenWidth > this.xs){
      this.desktop = true;
      this.mobile = false;
      console.log("App Component: desktop = true");
      /*this.fpsections = [
        {
          fpname: 'home', 
          fphref: '#home', 
          fpapp: '<app-home></app-home>', 
          fpclass: 'section'
        },
        {
          fpname: 'overview', 
          fphref: '#overview', 
          fpapp: '<app-overview></app-overview>', 
          fpclass: 'section'
        },
        {
          fpname: 'insights', 
          fphref: '#insights', 
          fpapp: '', 
          fpclass: 'section', 
          nav: '<nav-highlights></nav-hightlights>', 
          subsection: 
          [
              {fpname: 'insights', fphref: '#insights', fpapp: '<app-insights></app-insights>', fpclass: 'slide'},
              {fpname: 'report', fphref: '#insights/report', fpapp: '<app-reports></app-reports>', fpclass: 'slide'}
          ],
        },
        {
          fpname: 'press-kit', 
          fphref: '#press-kit', 
          fpapp: '', 
          fpclass: 'section', 
          nav: '<nav-press-kit></nav-press-kit>', 
          subsection: 
          [
              {fpname: 'press-kit', fphref: '#press-kit', fpapp: '<app-presentation></app-presentation>', fpclass: 'slide'},
              {fpname: 'press-release', fphref: '#press-kit/press-release', fpapp: '<app-press-release></press-release>', fpclass: 'slide'}
          ],
        },
        {
          fpname: 'corporate-payment-solutions', 
          fphref: '#corporate-payment-solutions', 
          fpapp: '<app-cps></app-cps>', 
          fpclass: 'section'
        },
        {
          fpname: 'contact-us', 
          fphref: '#contact-us', 
          fpapp: '<app-contact-us></app-contact-us>', 
          fpclass: 'section'
        }
      ];*/
    }else{
      this.desktop = false;
      this.mobile = true;
      console.log("App Component: desktop = false");
      this.fpsections = [
        {
          'home' : '<app-home></app-home>',
          'overview' : '<app-overview></app-overview',
          'insights' : '<app-insights></app-insights>',
          'report' : '<app-reports></app-reports>',
          'press-kit' : '<app-presentation></app-presentation>',
          'press-release' : '<app-press-release></press-release>',
          'corporate-payment-solutions' : '<app-cps></app-cps>',
          'contact-us' : '<app-contact-us></app-contact-us>'
        }
      ];
    }
  }
  
}

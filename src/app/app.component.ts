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
    if (this.screenWidth > this.data.xs){
      this.desktop = true;
      this.mobile = false;
      this.data.desktop = true;
      this.data.mobile = false;
      console.log("App Component: desktop = true");
    }else{
      this.desktop = false;
      this.mobile = true;
      this.data.desktop = false;
      this.data.mobile = true;
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

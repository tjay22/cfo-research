import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'nav-highlights',
  templateUrl: './nav-highlights.component.html',
  styleUrls: ['./nav-highlights.component.scss']
})
export class NavHighlightsComponent implements OnInit {

  links = [];

  constructor() {
    this.links = [
      { title: 'Insights', stlyeclass: 'icon-insights', linkhref: '#highlights/insights', iconname: 'fa-chart-pie'},
      //{ title: 'Videos', stlyeclass: 'icon-videos', linkhref: '#highlights/videos', svgname: 'video'},
      { title: 'Report', stlyeclass: 'icon-report', linkhref: '#highlights/report', iconname: 'fa-file-alt'}      
    ];
   }

  ngOnInit() {
  }

}

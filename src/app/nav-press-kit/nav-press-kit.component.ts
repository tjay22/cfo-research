import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'nav-press-kit',
  templateUrl: './nav-press-kit.component.html',
  styleUrls: ['./nav-press-kit.component.scss']
})
export class NavPressKitComponent implements OnInit {

  links = [];

  constructor() {

    this.links = [
      { title: 'Key Findings', stlyeclass: 'icon-presentation', linkhref: '#press-kit/presentation', iconname: 'fa-desktop'},
      { title: 'Press Release', stlyeclass: 'icon-press-kit', linkhref: '#press-kit/press-release', iconname: 'fa-bullhorn'}     
    ];

  }

  ngOnInit() {
  }

}

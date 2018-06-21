import { Component, OnInit } from '@angular/core';
import { DataService } from '../shared/data.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  screenDesktop;
  screenMobile;

  constructor(private data:DataService) { }

  ngOnInit() {
    this.screenDesktop = this.data.desktop;
    this.screenMobile = this.data.mobile;
  }

}

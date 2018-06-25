import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-presentation',
  templateUrl: './presentation.component.html',
  styleUrls: ['./presentation.component.scss']
})
export class PresentationComponent implements OnInit {

  slides = [];

  constructor() {
    this.slides = [
      'assets/presentation/slide1.jpeg',
      'assets/presentation/slide2.jpeg',
      'assets/presentation/slide3.jpeg',
      'assets/presentation/slide4.jpeg',
      'assets/presentation/slide5.jpeg',
      'assets/presentation/slide6.jpeg',
      'assets/presentation/slide7.jpeg',
      'assets/presentation/slide8.jpeg',
      'assets/presentation/slide9.jpeg',
      'assets/presentation/slide10.jpeg',
      'assets/presentation/slide11.jpeg',
      'assets/presentation/slide12.jpeg',
      'assets/presentation/slide13.jpeg',
      'assets/presentation/slide14.jpeg',
      'assets/presentation/slide15.jpeg',
      'assets/presentation/slide16.jpeg',
      'assets/presentation/slide17.jpeg',
      'assets/presentation/slide18.jpeg',
      'assets/presentation/slide19.jpeg',
      'assets/presentation/slide20.jpeg',
      'assets/presentation/slide21.jpeg',
      'assets/presentation/slide22.jpeg',
      'assets/presentation/slide23.jpeg',
      'assets/presentation/slide24.jpeg',
      'assets/presentation/slide25.jpeg',
      'assets/presentation/slide26.jpeg',
      'assets/presentation/slide27.jpeg',
      'assets/presentation/slide28.jpeg',
      'assets/presentation/slide29.jpeg',
      'assets/presentation/slide30.jpeg',
      'assets/presentation/slide31.jpeg',
      'assets/presentation/slide32.jpeg'
    ];
  }

  ngOnInit() {
    
  }

}

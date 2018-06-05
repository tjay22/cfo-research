import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavHighlightsComponent } from './nav-highlights.component';

describe('NavHighlightsComponent', () => {
  let component: NavHighlightsComponent;
  let fixture: ComponentFixture<NavHighlightsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavHighlightsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavHighlightsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

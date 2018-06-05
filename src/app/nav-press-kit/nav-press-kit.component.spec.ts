import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavPressKitComponent } from './nav-press-kit.component';

describe('NavPressKitComponent', () => {
  let component: NavPressKitComponent;
  let fixture: ComponentFixture<NavPressKitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavPressKitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavPressKitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

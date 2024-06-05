import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HorizontalBarStackedComponent } from './horizontal-bar-stacked.component';

describe('HorizontalBarStackedComponent', () => {
  let component: HorizontalBarStackedComponent;
  let fixture: ComponentFixture<HorizontalBarStackedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HorizontalBarStackedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HorizontalBarStackedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

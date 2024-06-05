import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerticalBarStackedComponent } from './vertical-bar-stacked.component';

describe('VerticalBarStackedComponent', () => {
  let component: VerticalBarStackedComponent;
  let fixture: ComponentFixture<VerticalBarStackedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerticalBarStackedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerticalBarStackedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DevRouteComponent } from './dev-route.component';

describe('DevRouteComponent', () => {
  let component: DevRouteComponent;
  let fixture: ComponentFixture<DevRouteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DevRouteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DevRouteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

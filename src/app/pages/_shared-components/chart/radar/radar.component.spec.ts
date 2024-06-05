import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { radarComponent } from './radar.component';

describe('radarComponent', () => {
  let component: radarComponent;
  let fixture: ComponentFixture<radarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ radarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(radarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

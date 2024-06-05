import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VisitCardItemComponent } from './visit-card-item.component';

describe('VisitCardItemComponent', () => {
  let component: VisitCardItemComponent;
  let fixture: ComponentFixture<VisitCardItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VisitCardItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VisitCardItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

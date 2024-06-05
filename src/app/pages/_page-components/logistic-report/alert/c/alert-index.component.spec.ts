import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertIndexComponent } from './alert-index.component';

describe('AlertIndexComponent', () => {
  let component: AlertIndexComponent;
  let fixture: ComponentFixture<AlertIndexComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlertIndexComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlertIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

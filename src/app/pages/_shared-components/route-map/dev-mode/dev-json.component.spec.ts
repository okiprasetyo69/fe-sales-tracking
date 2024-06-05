import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DevJsonComponent } from './dev-json.component';

describe('DevJsonComponent', () => {
  let component: DevJsonComponent;
  let fixture: ComponentFixture<DevJsonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DevJsonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DevJsonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

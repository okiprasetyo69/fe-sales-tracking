import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmReplaceComponent } from './confirm-replace.component';

describe('ConfirmReplaceComponent', () => {
  let component: ConfirmReplaceComponent;
  let fixture: ComponentFixture<ConfirmReplaceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfirmReplaceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmReplaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

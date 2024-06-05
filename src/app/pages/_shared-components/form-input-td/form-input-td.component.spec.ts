import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormInputTdComponent } from './form-input-td.component';

describe('_shared-components/form-input-td', () => {
  let component: FormInputTdComponent;
  let fixture: ComponentFixture<FormInputTdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormInputTdComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormInputTdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  //
  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});

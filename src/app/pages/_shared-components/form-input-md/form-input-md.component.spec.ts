import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormInputMdComponent } from './form-input-md.component';

describe('_shared-components/form-input-md', () => {
  let component: FormInputMdComponent;
  let fixture: ComponentFixture<FormInputMdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormInputMdComponent ],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormInputMdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  //
  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});

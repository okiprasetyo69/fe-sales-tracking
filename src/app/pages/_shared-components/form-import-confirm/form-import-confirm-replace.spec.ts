import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormImportConfirmComponent } from './form-import-confirm.component';

describe('FormImportConfirmComponent', () => {
  let component: FormImportConfirmComponent;
  let fixture: ComponentFixture<FormImportConfirmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormImportConfirmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormImportConfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

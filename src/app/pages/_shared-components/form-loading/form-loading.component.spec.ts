import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {FormLoadingComponent} from './form-loading.component';
import {FormLoadingModule} from "./form-loading.module";

describe('_shared-components/form-loading', () => {
  let component: FormLoadingComponent;
  let fixture: ComponentFixture<FormLoadingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormLoadingModule],
      declarations: [FormLoadingComponent]
    })
      .compileComponents();
  }));

  // beforeEach(() => {
  //   fixture = TestBed.createComponent(FormLoadingComponent);
  //   component = fixture.componentInstance;
  //   fixture.detectChanges();
  // });
  //
  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});

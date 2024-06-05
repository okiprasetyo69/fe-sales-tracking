import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DevModeComponent } from './dev-mode.component';

describe('_shared-components/dev-mode', () => {
  let component: DevModeComponent;
  let fixture: ComponentFixture<DevModeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DevModeComponent ],
    })
    .compileComponents();
  }));
  //
  // beforeEach(() => {
  //   fixture = TestBed.createComponent(DevModeComponent);
  //   component = fixture.componentInstance;
  //   fixture.detectChanges();
  // });
  //
  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RouterTestingModule } from '@angular/router/testing';
import { AreaModule } from '../area.module';
import { AreaEditComponent } from './area-edit.component';
import { } from 'jasmine';

describe('_page-component/area/c/edit', () => {
  let component: AreaEditComponent;
  let fixture: ComponentFixture<AreaEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [AreaModule, RouterTestingModule],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AreaEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // Error If Uncommented
  // it('should create', () => {
  //   pending('Unknown XMLHttpRequest');
  // });
});

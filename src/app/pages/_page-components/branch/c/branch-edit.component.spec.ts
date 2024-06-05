import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {RouterTestingModule} from "@angular/router/testing";
import {BranchModule} from "../branch.module";
import {BranchEditComponent} from "./branch-edit.component";

describe('_page-component/branch/c/edit', () => {
  let component: BranchEditComponent;
  let fixture: ComponentFixture<BranchEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [BranchModule, RouterTestingModule],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BranchEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy()
  });
});

import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {RouterTestingModule} from "@angular/router/testing";
import {BranchModule} from "../branch.module";
import {BranchIndexComponent} from "./branch-index.component";

describe('_page-component/branch/c/index', () => {
  let component: BranchIndexComponent;
  let fixture: ComponentFixture<BranchIndexComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [BranchModule, RouterTestingModule],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BranchIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy()
  });
});

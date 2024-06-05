import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BranchImportComponent } from './branch-import.component';

describe('BranchImportComponent', () => {
  let component: BranchImportComponent;
  let fixture: ComponentFixture<BranchImportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BranchImportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BranchImportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

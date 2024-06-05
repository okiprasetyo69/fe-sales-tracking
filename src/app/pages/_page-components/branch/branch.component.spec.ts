import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RouterTestingModule } from '@angular/router/testing';
import { BranchModule } from './branch.module';
import { BranchComponent } from './branch.component';

describe('_page-component/branch/component', () => {
  let component: BranchComponent;
  let fixture: ComponentFixture<BranchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [BranchModule, RouterTestingModule],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BranchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

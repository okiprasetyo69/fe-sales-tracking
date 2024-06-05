import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterPackingSlipComponent } from './filter-packing-slip.component';

describe('FilterPackingSlipComponent', () => {
  let component: FilterPackingSlipComponent;
  let fixture: ComponentFixture<FilterPackingSlipComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilterPackingSlipComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterPackingSlipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PackingSlipIndexComponent } from './packing-slip-index.component';

describe('PackingSlipIndexComponent', () => {
  let component: PackingSlipIndexComponent;
  let fixture: ComponentFixture<PackingSlipIndexComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PackingSlipIndexComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PackingSlipIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

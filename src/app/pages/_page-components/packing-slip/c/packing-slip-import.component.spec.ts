import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PackingSlipImportComponent } from './packing-slip-import.component';

describe('PackingSlipImportComponent', () => {
  let component: PackingSlipImportComponent;
  let fixture: ComponentFixture<PackingSlipImportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PackingSlipImportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PackingSlipImportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DivisionsImportComponent } from './divisions-import.component';

describe('DivisionsImportComponent', () => {
  let component: DivisionsImportComponent;
  let fixture: ComponentFixture<DivisionsImportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DivisionsImportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DivisionsImportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

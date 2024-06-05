import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetsImportComponent } from './assets-import.component';

describe('AssetsImportComponent', () => {
  let component: AssetsImportComponent;
  let fixture: ComponentFixture<AssetsImportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssetsImportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssetsImportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetsTypeIndexComponent } from './assets-type-index.component';

describe('AssetsTypeIndexComponent', () => {
  let component: AssetsTypeIndexComponent;
  let fixture: ComponentFixture<AssetsTypeIndexComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssetsTypeIndexComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssetsTypeIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

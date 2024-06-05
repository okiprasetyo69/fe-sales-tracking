import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderDetailComponent } from './header-detail.component';

describe('_shared-components/header-detail', () => {
  let component: HeaderDetailComponent;
  let fixture: ComponentFixture<HeaderDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeaderDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

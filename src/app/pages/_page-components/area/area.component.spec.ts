import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RouterTestingModule } from '@angular/router/testing';
import { AreaComponent } from './area.component';
import { AreaModule } from './area.module';

describe('_page-component/area/component', () => {
  let component: AreaComponent;
  let fixture: ComponentFixture<AreaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [AreaModule, RouterTestingModule],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

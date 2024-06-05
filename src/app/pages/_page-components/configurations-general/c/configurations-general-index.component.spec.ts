import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {RouterTestingModule} from "@angular/router/testing";
import {ConfigurationsGeneralModule} from "../configurations-general.module";
import {ConfigurationsGeneralIndexComponent} from "./configurations-general-index.component";

describe('_page-component/configurations-general/c/index', () => {
  let component: ConfigurationsGeneralIndexComponent;
  let fixture: ComponentFixture<ConfigurationsGeneralIndexComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ConfigurationsGeneralModule, RouterTestingModule],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfigurationsGeneralIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy()
  });
});

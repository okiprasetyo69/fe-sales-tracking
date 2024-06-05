import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {RouterTestingModule} from "@angular/router/testing";
import {ConfigurationsGeneralModule} from "./configurations-general.module";
import {ConfigurationsGeneralComponent} from "./configurations-general.component";

describe('_page-component/configurations-general/component', () => {
  let component: ConfigurationsGeneralComponent;
  let fixture: ComponentFixture<ConfigurationsGeneralComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ConfigurationsGeneralModule, RouterTestingModule],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfigurationsGeneralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy()
  });
});

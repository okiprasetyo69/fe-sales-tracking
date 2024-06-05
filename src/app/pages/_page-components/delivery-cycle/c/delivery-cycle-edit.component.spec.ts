import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {RouterTestingModule} from "@angular/router/testing";
import {DeliveryCycleModule} from "../delivery-cycle.module";
import {DeliveryCycleComponent} from "../delivery-cycle.component";

describe('_page-component/delivery-cycle/c/edit', () => {
  let component: DeliveryCycleComponent;
  let fixture: ComponentFixture<DeliveryCycleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [DeliveryCycleModule, RouterTestingModule],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeliveryCycleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy()
  });
});

import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {RouterTestingModule} from "@angular/router/testing";
import {DeliveryCycleModule} from "../delivery-cycle.module";
import {DeliveryCycleIndexComponent} from "./delivery-cycle-index.component";

describe('_page-component/delivery-cycle/c/index', () => {
  let component: DeliveryCycleIndexComponent;
  let fixture: ComponentFixture<DeliveryCycleIndexComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [DeliveryCycleModule, RouterTestingModule],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeliveryCycleIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy()
  });
});

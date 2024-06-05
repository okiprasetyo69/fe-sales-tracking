import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {RouterTestingModule} from "@angular/router/testing";
import {ContactsModule} from "../contacts.module";
import {ContactsCreateComponent} from "./contacts-create.component";

describe('_page-component/contacts/c/create', () => {
  let component: ContactsCreateComponent;
  let fixture: ComponentFixture<ContactsCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ContactsModule, RouterTestingModule],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactsCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy()
  });
});

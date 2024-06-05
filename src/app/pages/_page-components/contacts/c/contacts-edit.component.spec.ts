import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {RouterTestingModule} from "@angular/router/testing";
import {ContactsModule} from "../contacts.module";
import {ContactsEditComponent} from "./contacts-edit.component";

describe('_page-component/contacts/c/edit', () => {
  let component: ContactsEditComponent;
  let fixture: ComponentFixture<ContactsEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ContactsModule, RouterTestingModule],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactsEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy()
  });
});

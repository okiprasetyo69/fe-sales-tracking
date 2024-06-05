import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AbsenceIndexComponent } from './absence-index.component';
import {RouterTestingModule} from "@angular/router/testing";
import {AbsencesModule} from '../absences.module';


describe('AbsenceIndexComponent', () => {
  let component: AbsenceIndexComponent;
  let fixture: ComponentFixture<AbsenceIndexComponent>;
  
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      //imports: [ AbsencesModule, RouterTestingModule ]
      declarations: [ AbsenceIndexComponent ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AbsenceIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

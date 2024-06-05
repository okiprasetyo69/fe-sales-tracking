import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {AbsencesComponent} from './absences.component';
import {AbsencesModule} from './absences.module';
import {RouterTestingModule} from "@angular/router/testing";

describe('AbsencesComponent', () => {
  let component: AbsencesComponent;
  let fixture: ComponentFixture<AbsencesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AbsencesComponent ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AbsencesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  
});

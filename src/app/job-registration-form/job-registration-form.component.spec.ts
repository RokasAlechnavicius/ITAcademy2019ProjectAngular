import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JobRegistrationFormComponent } from './job-registration-form.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatDatepickerModule, MatInputModule, MatNativeDateModule, MatSelectModule} from '@angular/material';

describe('JobRegistrationFormComponent', () => {
  let component: JobRegistrationFormComponent;
  let fixture: ComponentFixture<JobRegistrationFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JobRegistrationFormComponent ],
      imports: [ FormsModule,
        ReactiveFormsModule,
        MatDatepickerModule,
        MatInputModule,
        MatSelectModule,
        MatNativeDateModule,
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JobRegistrationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
});

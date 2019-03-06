import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JobRegistrationFormComponent } from './job-registration-form.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatDatepickerModule, MatInputModule, MatNativeDateModule, MatSelectModule} from '@angular/material';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {RouterTestingModule} from '@angular/router/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

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
        RouterTestingModule,
        HttpClientTestingModule,
        BrowserAnimationsModule
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JobRegistrationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

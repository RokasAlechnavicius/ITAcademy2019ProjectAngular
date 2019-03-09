import { ComponentFixture, TestBed } from '@angular/core/testing';
import { JobRegistrationFormComponent } from './job-registration-form.component';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule, MatInputModule, MatNativeDateModule, MatSelectModule } from '@angular/material';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { JobService } from '../services/job.service';

describe('JobRegistrationFormComponent', () => {
    let component: JobRegistrationFormComponent;
    let fixture: ComponentFixture<JobRegistrationFormComponent>;
    let control: FormControl;
    let jobService: JobService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [JobRegistrationFormComponent],
            imports: [
                FormsModule,
                ReactiveFormsModule,
                MatDatepickerModule,
                MatInputModule,
                MatSelectModule,
                MatNativeDateModule,
                RouterTestingModule,
                HttpClientTestingModule,
                BrowserAnimationsModule
            ],
            providers: [JobService],
            schemas: [CUSTOM_ELEMENTS_SCHEMA]
        });

        fixture = TestBed.createComponent(JobRegistrationFormComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
        control = new FormControl();
    });

    it('JobRegistrationFormComponent should create', () => {
        expect(component).toBeTruthy();
    });

    it('createForm should create jobForm', () => {
        component.jobForm = null;
        component.createForm();
        expect(component.jobForm.getRawValue().toString()).toBe(
            {
                date: null,
                idea: '',
                organisation: '',
                city: '',
                category: '',
                email: '',
                contactName: '',
                website: '',
                phone: '',
                description: ''
            }.toString()
        );
    });

    it('noWhiteSpaceValidator function should return that empty string is invalid', () => {
        control.setValue('');
        expect(component.noWhiteSpaceValidator(control)).toBeTruthy();
    });

    it('noWhiteSpaceValidator function should return that spaces only are invalid', () => {
        control.setValue('                                   ');
        expect(component.noWhiteSpaceValidator(control)).toBeTruthy();
    });

    it('noWhiteSpaceValidator function should return that null is invalid', () => {
        control.setValue(null);
        expect(component.noWhiteSpaceValidator(control)).toBeTruthy();
    });

    it('noWhiteSpaceValidator function should return that text is not considered invalid', () => {
        control.setValue('valid text');
        expect(component.noWhiteSpaceValidator(control)).toBe(null);
    });

    fit('addJob should call JobService', () => {
        jobService = TestBed.get(JobService);
        spyOn(jobService, 'addJob').and.callThrough();
        component.addJob();
        expect(jobService.addJob).toHaveBeenCalled();
    });
});

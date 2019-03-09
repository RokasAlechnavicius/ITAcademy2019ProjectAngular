import { ComponentFixture, TestBed } from '@angular/core/testing';
import { JobRegistrationFormComponent } from './job-registration-form.component';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule, MatInputModule, MatNativeDateModule, MatSelectModule } from '@angular/material';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { JobService } from '../services/job.service';
import { By } from '@angular/platform-browser';

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
        jobService = TestBed.get(JobService);
        spyOn(jobService, 'addJob').and.callThrough();
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
                region: '',
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

    it('addJob should call JobService', () => {
        jobService = TestBed.get(JobService);
        spyOn(jobService, 'addJob').and.callThrough();
        component.addJob();
        expect(jobService.addJob).toHaveBeenCalled();
    });

    it('should not call addJob when form fields are empty', () => {
        const el = fixture.debugElement.query(By.css('form')).nativeElement;
        spyOn(component, 'addJob');
        el.click();
        expect(component.addJob).toHaveBeenCalledTimes(0);
    });

    it('should validate that email structure is correct', () => {
        // prepare other job form fields
        component.jobForm.controls.organisation.setValue('test');
        component.jobForm.controls.idea.setValue('test');
        component.jobForm.controls.city.setValue('test');
        component.jobForm.controls.date.setValue('2019-12-12');
        component.jobForm.controls.category.setValue('test');
        component.jobForm.controls.contactName.setValue('test');
        component.jobForm.controls.phone.setValue('12345678');
        component.jobForm.controls.description.setValue('test');
        // test email structures
        component.jobForm.controls.email.setValue('test@test.ng');
        expect(component.jobForm.valid).toBeTruthy();
        component.jobForm.controls.email.setValue('test@test');
        expect(component.jobForm.valid).toBeTruthy();
        component.jobForm.controls.email.setValue('@test');
        expect(component.jobForm.valid).toBeFalsy();
        component.jobForm.controls.email.setValue('test@');
        expect(component.jobForm.valid).toBeFalsy();
    });

    it('should say form invalid until all required fields are filled', () => {
        component.createForm();
        component.jobForm.controls.organisation.setValue('test');
        expect(component.jobForm.valid).toBeFalsy();
        component.jobForm.controls.idea.setValue('test');
        expect(component.jobForm.valid).toBeFalsy();
        component.jobForm.controls.city.setValue('test');
        expect(component.jobForm.valid).toBeFalsy();
        component.jobForm.controls.date.setValue('2019-12-12');
        expect(component.jobForm.valid).toBeFalsy();
        component.jobForm.controls.category.setValue('test');
        expect(component.jobForm.valid).toBeFalsy();
        component.jobForm.controls.contactName.setValue('test');
        expect(component.jobForm.valid).toBeFalsy();
        component.jobForm.controls.phone.setValue('12345678');
        expect(component.jobForm.valid).toBeFalsy();
        component.jobForm.controls.description.setValue('test');
        expect(component.jobForm.valid).toBeTruthy();
    });
});

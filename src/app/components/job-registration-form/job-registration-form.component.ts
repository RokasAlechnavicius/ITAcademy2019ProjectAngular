import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';
// @ts-ignore
import * as regionsData from '../../../assets/regions.json';
import * as categoriesData from '../../../assets/categories.json';
import { Router } from '@angular/router';
import { JobService } from '../../services/job.service';
import { AlertService } from '../../services/alert.service';
import { User } from '../../models';

const JOB_REGISTRATION_FORM_OPTIONS = {
    ideaMaxLength: 64,
    organizationMaxLength: 64,
    regionMaxLength: 32,
    categoryMaxLength: 32,
    emailMaxLength: 64,
    contactNameMaxLength: 64,
    descriptionMaxLength: 512,
    websiteMaxLength: 32,
    formErrorMessage: 'an error has occurred: ',
    keyboardLetterECode: 69,
    phoneMax: 999999999999,
    windowBreakWidth: 1375
};

@Component({
    selector: 'app-job-registration-form',
    templateUrl: './job-registration-form.component.html',
    styleUrls: ['./job-registration-form.component.scss']
})
export class JobRegistrationFormComponent implements OnInit {
    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private jobService: JobService,
        private alertService: AlertService
    ) {}
    jobFormConstants = JOB_REGISTRATION_FORM_OPTIONS;
    minDate = new Date();
    date: string;
    categories = categoriesData.categories;
    regions = regionsData.regions;
    jobForm: FormGroup;
    breakpoint: number;
    team: User[] = [];

    public noWhiteSpaceValidator(control: FormControl) {
        const isWhitespace = (control.value || '').trim().length === 0;
        const isValid = !isWhitespace;
        return isValid ? null : { whitespace: true };
    }

    ngOnInit() {
        this.createForm();
        this.breakpoint = window.innerWidth <= 1375 ? 1 : 2;
    }

    createForm() {
        this.jobForm = this.formBuilder.group({
            date: [null, [Validators.required]],
            idea: [
                '',
                [
                    Validators.required,
                    Validators.maxLength(JOB_REGISTRATION_FORM_OPTIONS.ideaMaxLength),
                    this.noWhiteSpaceValidator
                ]
            ],
            organisation: [
                '',
                [
                    Validators.required,
                    Validators.maxLength(JOB_REGISTRATION_FORM_OPTIONS.organizationMaxLength),
                    this.noWhiteSpaceValidator
                ]
            ],
            region: [
                '',
                [
                    Validators.required,
                    Validators.maxLength(JOB_REGISTRATION_FORM_OPTIONS.regionMaxLength),
                    this.noWhiteSpaceValidator
                ]
            ],
            category: [
                '',
                [
                    Validators.required,
                    Validators.maxLength(JOB_REGISTRATION_FORM_OPTIONS.categoryMaxLength),
                    this.noWhiteSpaceValidator
                ]
            ],
            email: ['', [Validators.email, Validators.maxLength(JOB_REGISTRATION_FORM_OPTIONS.emailMaxLength)]],
            contactName: [
                '',
                [
                    Validators.required,
                    Validators.maxLength(JOB_REGISTRATION_FORM_OPTIONS.contactNameMaxLength),
                    this.noWhiteSpaceValidator
                ]
            ],
            website: ['', [Validators.maxLength(JOB_REGISTRATION_FORM_OPTIONS.websiteMaxLength)]],
            phone: ['', [Validators.required, Validators.max(JOB_REGISTRATION_FORM_OPTIONS.phoneMax)]],
            description: [
                '',
                [
                    Validators.required,
                    Validators.maxLength(JOB_REGISTRATION_FORM_OPTIONS.descriptionMaxLength),
                    this.noWhiteSpaceValidator
                ]
            ],
            team: [this.team]
        });
    }

    addJob() {
        const stringedDate = moment(this.jobForm.get('date').value).format('YYYY-MM-DD');
        this.jobForm.controls.date.setValue(stringedDate);
        this.jobService.addJob(this.jobForm.value).subscribe(
            data => {
                this.router.navigate(['/jobs']);
            },
            err => {
                this.alertService.createErrorAlert(JOB_REGISTRATION_FORM_OPTIONS.formErrorMessage + err.error.message);
            }
        );
    }

    onResize(event) {
        this.breakpoint = event.target.innerWidth <= JOB_REGISTRATION_FORM_OPTIONS.windowBreakWidth ? 1 : 2;
    }
}

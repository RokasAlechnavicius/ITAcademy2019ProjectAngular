import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';
// @ts-ignore
import * as regionsData from './../../assets/regions.json';
import * as categoriesData from './../../assets/categories.json';
import { Router } from '@angular/router';
import { JobService } from '../services/job.service';
import { AlertService } from '../services/alert.service';

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
    minDate = new Date();
    date: string;
    categories = categoriesData.categories;
    regions = regionsData.regions;
    jobForm: FormGroup;
    breakpoint: number;

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
            idea: ['', [Validators.required, Validators.maxLength(64), this.noWhiteSpaceValidator]],
            organisation: ['', [Validators.required, Validators.maxLength(64), this.noWhiteSpaceValidator]],
            region: ['', [Validators.required, Validators.maxLength(64), this.noWhiteSpaceValidator]],
            category: ['', [Validators.required, Validators.maxLength(32), this.noWhiteSpaceValidator]],
            email: ['', [Validators.email, Validators.maxLength(64)]],
            contactName: ['', [Validators.required, Validators.maxLength(64), this.noWhiteSpaceValidator]],
            website: ['', [Validators.maxLength(32)]],
            phone: ['', [Validators.required, Validators.max(999999999999)]],
            description: ['', [Validators.required, Validators.maxLength(512), this.noWhiteSpaceValidator]]
        });
    }

    addJob() {
        const stringedDate = moment(this.jobForm.get('date').value).format('YYYY-MM-DD');
        this.jobForm.controls.date.setValue(stringedDate);
        // we have a proper form  with values to pass into a service now, need a service to handle it
        this.jobService.addJob(this.jobForm.value).subscribe(
            data => {
                this.router.navigate(['/jobs']);
            },
            err => {
                this.alertService.createErrorAlert('an error has occurred: ' + err);
            }
        );
    }

    onResize(event) {
        this.breakpoint = event.target.innerWidth <= 1375 ? 1 : 2;
    }
}

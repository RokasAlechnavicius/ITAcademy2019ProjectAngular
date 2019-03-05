import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import * as moment from 'moment';
// @ts-ignore
import * as citiesData from './../../assets/cities.json';
import {Router} from '@angular/router';

export interface Category {
  value: string;
}

@Component({
  selector: 'app-job-registration-form',
  templateUrl: './job-registration-form.component.html',
  styleUrls: ['./job-registration-form.component.scss']
})
export class JobRegistrationFormComponent implements OnInit {
  date: string;

  categories: Category[] = [
    {value: 'Time and help for another'},
    {value: 'Time for the environment'},
    {value: 'Time for sharing knowledge'},
    {value: 'Professional volunteering'},
  ];

  cities =   citiesData.cities;

  jobForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private router: Router) {

  }



  ngOnInit() {

    this.createForm();
  }

  createForm() {
    this.jobForm = this.formBuilder.group({
        date: [null, [Validators.required]],
        idea: ['', [Validators.required, Validators.maxLength(256)]],
        organization: ['', [Validators.required, Validators.maxLength(128)]],
        city: ['', [Validators.required, Validators.maxLength(40)]],
        category: ['', [Validators.required, Validators.maxLength(40)]],
        email: ['', [Validators.email, Validators.maxLength(50)]],
        contactName: ['', [Validators.required, Validators.maxLength(64)]],
        website: ['', [Validators.maxLength(64)]],
        phone: ['', [Validators.required]],
        description: ['', [Validators.required, Validators.maxLength(1024)]]
    });
  }

  addJob() {
    const stringedDate = moment(this.jobForm.get('date').value).format('DD.MM.YYYY');
    this.jobForm.controls.date.setValue(stringedDate);
    // we have a proper form  with values to pass into a service now, need a service to handle it
    this.router.navigate(['/home']);

  }
}

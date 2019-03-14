import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from '../../services/alert.service';
import { UserAuthenticationService } from '../../services/user-authentication.service';
import { passwordsMustMatch } from '../../helpers/passwords-must-match.validator';

// @ts-ignore
import * as regionsData from '../../../assets/regions.json';
import { first } from 'rxjs/operators';

const USER_REGISTRATION_FORM_OPTIONS = {
    nameMaxLength: 32,
    surnameMaxLength: 64,
    emailMaxLength: 64,
    regionMaxLength: 64,
    passwordMaxLength: 32,
    passwordMinLength: 7
};
const returnUrl = '/login';
@Component({
    selector: 'app-user-registration-form',
    templateUrl: './user-registration-form.component.html',
    styleUrls: ['./user-registration-form.component.scss']
})
export class UserRegistrationFormComponent implements OnInit {
    userRegistrationFormOptions = USER_REGISTRATION_FORM_OPTIONS;
    registerForm: FormGroup;
    loading = false;
    submitted = false;
    regions = regionsData.regions;
    breakpoint: number;
    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private route: ActivatedRoute,
        private userAuthenticationService: UserAuthenticationService,
        private alertService: AlertService
    ) {}

    ngOnInit() {
        this.breakpoint = window.innerWidth <= 1500 ? 1 : 2;
        this.createForm();
        this.userAuthenticationService.logout();
    }

    onResize(event) {
        this.breakpoint = event.target.innerWidth <= 1500 ? 1 : 2;
    }

    public noWhiteSpaceValidator(control: FormControl) {
        const isWhitespace = (control.value || '').trim().length === 0;
        const isValid = !isWhitespace;
        return isValid ? null : { whitespace: true };
    }

    createForm() {
        this.registerForm = this.formBuilder.group(
            {
                name: [
                    '',
                    [
                        Validators.required,
                        Validators.maxLength(USER_REGISTRATION_FORM_OPTIONS.nameMaxLength),
                        this.noWhiteSpaceValidator
                    ]
                ],
                surname: [
                    '',
                    [
                        Validators.required,
                        Validators.maxLength(USER_REGISTRATION_FORM_OPTIONS.surnameMaxLength),
                        this.noWhiteSpaceValidator
                    ]
                ],
                email: [
                    '',
                    [
                        Validators.required,
                        Validators.email,
                        Validators.maxLength(USER_REGISTRATION_FORM_OPTIONS.emailMaxLength),
                        this.noWhiteSpaceValidator
                    ]
                ],
                region: [
                    '',
                    [
                        Validators.required,
                        Validators.maxLength(USER_REGISTRATION_FORM_OPTIONS.regionMaxLength),
                        this.noWhiteSpaceValidator
                    ]
                ],
                password: [
                    '',
                    [
                        Validators.required,
                        Validators.minLength(USER_REGISTRATION_FORM_OPTIONS.passwordMinLength),
                        Validators.maxLength(USER_REGISTRATION_FORM_OPTIONS.passwordMaxLength),
                        this.noWhiteSpaceValidator
                    ]
                ],
                passwordRepeat: [
                    '',
                    [
                        Validators.required,
                        Validators.minLength(USER_REGISTRATION_FORM_OPTIONS.passwordMinLength),
                        Validators.maxLength(USER_REGISTRATION_FORM_OPTIONS.passwordMaxLength),
                        this.noWhiteSpaceValidator
                    ]
                ]
            },
            {
                validator: passwordsMustMatch('password', 'passwordRepeat')
            }
        );
    }

    registerUser() {
        this.submitted = true;
        if (this.registerForm.invalid) {
            return;
        }

        this.loading = true;
        this.userAuthenticationService
            .registerUser(this.registerForm.value)
            .pipe(first())
            .subscribe(
                data => {
                    this.alertService.createSuccessAlert('User has been registered succesfuly', true);
                    this.router.navigate([returnUrl]);
                },
                error => {
                    this.alertService.createErrorAlert('An error has occured: ' + error.error.message);
                    this.loading = false;
                }
            );
    }
}

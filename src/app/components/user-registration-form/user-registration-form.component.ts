import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from '../../services/alert.service';
import { UserAuthenticationService } from '../../services/user-authentication.service';
import { passwordsMustMatch } from '../../helpers/passwords-must-match.validator';
import {
    USER_REGISTRATION_FORM_MESSAGES,
    USER_REGISTRATION_FORM_OPTIONS
} from '../../constants/user-registration-form-constants';
import { first } from 'rxjs/operators';

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
    hidePassword = true;
    hideRepeatPassword = true;
    breakpoint: number;
    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private route: ActivatedRoute,
        private userAuthenticationService: UserAuthenticationService,
        private alertService: AlertService
    ) {}

    ngOnInit() {
        this.breakpoint = window.innerWidth <= 1500 ? 1 : 1;
        this.createForm();
        this.userAuthenticationService.logout();
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
                        this.noWhiteSpaceValidator,
                        Validators.pattern('^[a-zA-Z0-9_.+-]+@(?:(?:[a-zA-Z0-9-]+.)?[a-zA-Z]+.)?(darboviete).lt$')
                    ]
                ],
                region: [''],
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
                    this.alertService.createSuccessAlert(USER_REGISTRATION_FORM_MESSAGES.successRegistration, true);
                    this.router.navigate([returnUrl]);
                },
                error => {
                    this.alertService.createErrorAlert(
                        USER_REGISTRATION_FORM_MESSAGES.errorRegistration + error.error.message
                    );
                    this.loading = false;
                }
            );
    }
}

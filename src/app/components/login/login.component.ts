import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserAuthenticationService } from '../../services/user-authentication.service';
import { first } from 'rxjs/operators';
import { AlertService } from '../../services/alert.service';
import { LOGIN_FORM_MESSAGES } from '../../constants/login-constants';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    loginForm: FormGroup;
    loading = false;
    submitted = false;
    returnUrl: string;
    error = '';

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private userAuthenticationService: UserAuthenticationService,
        private alertService: AlertService
    ) {}

    ngOnInit() {
        this.createForm();
        this.userAuthenticationService.logout();
        this.returnUrl = this.route.snapshot.queryParams.returnUrl || '/';
    }

    createForm() {
        this.loginForm = this.formBuilder.group({
            email: ['', Validators.required],
            password: ['', [Validators.required]]
        });
    }

    submitForm() {
        this.submitted = true;

        if (this.loginForm.invalid) {
            return;
        }

        this.loading = true;
        this.userAuthenticationService
            .login(this.loginForm.get('email').value, this.loginForm.get('password').value)
            .pipe(first())
            .subscribe(
                data => {
                    this.alertService.createSuccessAlert(LOGIN_FORM_MESSAGES.successMessage, true);
                    this.router.navigate([this.returnUrl]);
                },
                error => {
                    this.alertService.createErrorAlert(LOGIN_FORM_MESSAGES.errorMessage, false);
                    this.loading = false;
                }
            );
    }
}

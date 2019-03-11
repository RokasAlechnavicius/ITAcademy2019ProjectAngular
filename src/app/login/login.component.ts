import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserAuthenticationService } from '../services/user-authentication.service';
import { first } from 'rxjs/operators';
import { AlertService } from '../services/alert.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss', '../app.component.scss']
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
                    this.router.navigate([this.returnUrl]);
                },
                error => {
                    this.alertService.createErrorAlert('invalid email or password provided', false);
                    this.loading = false;
                }
            );
    }
}

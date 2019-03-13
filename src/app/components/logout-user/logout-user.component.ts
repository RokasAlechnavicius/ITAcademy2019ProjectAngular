import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserAuthenticationService } from '../../services/user-authentication.service';
import { AlertService } from '../../services/alert.service';
@Component({
    selector: 'app-logout-user',
    templateUrl: './logout-user.component.html',
    styleUrls: ['./logout-user.component.scss']
})
export class LogoutUserComponent implements OnInit {
    constructor(
        private router: Router,
        private userAuthenticationService: UserAuthenticationService,
        private alertService: AlertService
    ) {}

    ngOnInit() {
        this.userAuthenticationService.logout();
        this.alertService.createSuccessAlert('You have been successfully logged out', true);
        this.router.navigate(['/']);
    }
}

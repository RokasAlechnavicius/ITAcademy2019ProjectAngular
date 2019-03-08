import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserAuthenticationService } from '../services/user-authentication.service';
@Component({
    selector: 'app-logout-user',
    templateUrl: './logout-user.component.html',
    styleUrls: ['./logout-user.component.css']
})
export class LogoutUserComponent implements OnInit {
    constructor(private router: Router, private userAuthenticationService: UserAuthenticationService) {}

    ngOnInit() {
        this.userAuthenticationService.logout();
        this.router.navigate(['/']);
    }
}

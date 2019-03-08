import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { map } from 'rxjs/operators';
import { UserAuthenticationService } from './services/user-authentication.service';
import { User } from './models';
import { Router } from '@angular/router';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    title = 'Summer Good Deeds';
    currentUser: User;

    isHandset$: Observable<boolean> = this.breakpointObserver
        .observe(Breakpoints.Handset)
        .pipe(map(result => result.matches));

    logout() {
        this.userAuthenticationService.logout();
        this.router.navigate(['/login']);
    }

    user() {
        return localStorage.getItem('currentUser');
    }

    constructor(
        private breakpointObserver: BreakpointObserver,
        private router: Router,
        private userAuthenticationService: UserAuthenticationService
    ) {
        // this.userAuthenticationService.currentUser.subscribe(userLoggedIn => (this.currentUser = userLoggedIn));
    }
}

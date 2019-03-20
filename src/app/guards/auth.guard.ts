import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { UserAuthenticationService } from '../services/user-authentication.service';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {
    constructor(private router: Router, private userService: UserAuthenticationService) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        const currentAdmin = JSON.parse(localStorage.getItem('currentAdmin'));
        if (currentUser) {
            return true;
        }
        if (currentAdmin) {
            this.userService.logout();
        }
        this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
        return false;
    }
}

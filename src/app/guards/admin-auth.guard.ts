import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { UserAuthenticationService } from '../services/user-authentication.service';

@Injectable({
    providedIn: 'root'
})
export class AdminAuthGuard implements CanActivate {
    constructor(private router: Router, private userService: UserAuthenticationService) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const currentAdmin = JSON.parse(localStorage.getItem('currentAdmin'));
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentAdmin) {
            return true;
        }
        if (currentUser) {
            this.userService.logout();
        }
        this.router.navigate(['/login']);
        return false;
    }
}

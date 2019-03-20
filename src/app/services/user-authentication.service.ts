import { Injectable } from '@angular/core';
import { User } from '../models';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
const HEROKU_URL = 'https://response-test-backend.herokuapp.com';

@Injectable({
    providedIn: 'root'
})
export class UserAuthenticationService {
    constructor(private http: HttpClient) {}

    login(email: string, password: string) {
        return this.http.post<any>(HEROKU_URL + '/login', { email, password }, { observe: 'response' }).pipe(
            map(user => {
                if (user) {
                    localStorage.setItem('userType', user.body.role);
                    if (user.body.role === 'user') {
                        localStorage.setItem('currentUser', JSON.stringify(user));
                        localStorage.setItem('currentUserToken', JSON.stringify(user.headers.get('Authorization')));
                    } else {
                        localStorage.setItem('currentAdmin', JSON.stringify(user));
                        localStorage.setItem('currentAdminToken', JSON.stringify(user.headers.get('Authorization')));
                    }
                    localStorage.setItem('currentUserEmail', email);
                }
                return user;
            })
        );
    }

    logout() {
        if (localStorage.getItem('currentUser') != null) {
            localStorage.removeItem('currentUser');
            localStorage.removeItem('currentUserToken');
        } else if (localStorage.getItem('currentAdmin') != null) {
            localStorage.removeItem('currentAdmin');
            localStorage.removeItem('currentAdminToken');
        }
        localStorage.removeItem('currentUserEmail');
    }

    registerUser(user: User) {
        return this.http.post(HEROKU_URL + '/sign-up', user);
    }
}

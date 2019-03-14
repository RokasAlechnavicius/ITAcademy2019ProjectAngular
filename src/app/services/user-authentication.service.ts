import { Injectable } from '@angular/core';
import { User } from '../models';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
const herokuUrl = 'https://team-test-backend.herokuapp.com';

@Injectable({
    providedIn: 'root'
})
export class UserAuthenticationService {
    constructor(private http: HttpClient) {}

    login(email: string, password: string) {
        return this.http.post<any>(herokuUrl + '/login', { email, password }, { observe: 'response' }).pipe(
            map(user => {
                if (user) {
                    localStorage.setItem('currentUser', JSON.stringify(user));
                    localStorage.setItem('currentUserToken', JSON.stringify(user.headers.get('Authorization')));
                }
                return user;
            })
        );
    }

    logout() {
        localStorage.removeItem('currentUser');
        localStorage.removeItem('currentUserToken');
    }

    registerUser(user: User) {
        return this.http.post(herokuUrl + '/sign-up', user);
    }
}

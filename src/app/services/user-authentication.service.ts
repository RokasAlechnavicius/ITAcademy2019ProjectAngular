import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Job, User } from '../models';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { userError } from '@angular/compiler-cli/src/transformers/util';
const herokuUrl = 'https://login-test-backend.herokuapp.com';

@Injectable({
    providedIn: 'root'
})
export class UserAuthenticationService {
    public currentUser: Observable<User>;

    constructor(private http: HttpClient) {}

    login(email: string, password: string) {
        return this.http.post<any>(herokuUrl + '/login', { email, password }, { observe: 'response' }).pipe(
            map(user => {
                if (user) {
                    localStorage.setItem('currentUser', JSON.stringify(user));
                }

                return user;
            })
        );
    }

    logout() {
        localStorage.removeItem('currentUser');
    }

    registerUser(user: User) {
        return this.http.post(herokuUrl + '/sign-up', user);
    }
}

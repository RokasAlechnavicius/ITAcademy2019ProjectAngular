import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Job, User } from '../models';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { userError } from '@angular/compiler-cli/src/transformers/util';
const herokuUrl = 'https://test2-backend.herokuapp.com';

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

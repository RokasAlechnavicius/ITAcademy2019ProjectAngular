import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../models';
import {HttpClient} from '@angular/common/http';
import { map } from 'rxjs/operators';
const herokuUrl = 'https://login-test-backend.herokuapp.com';

@Injectable({
    providedIn: 'root'
})
export class UserAuthenticationService {
    public currentUser: Observable<User>;

    constructor(private http: HttpClient) {
    }

    login(email: string, password: string) {
        return this.http.post<any>(herokuUrl + '/login', { email, password }, {observe: 'response'}).pipe(
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
}

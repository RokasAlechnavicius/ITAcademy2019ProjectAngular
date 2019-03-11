import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class JwtInterceptor implements HttpInterceptor {
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        const currentUserToken = JSON.parse(localStorage.getItem('currentUserToken'));
        if (currentUser && currentUserToken) {
            request = request.clone({
                setHeaders: {
                    Authorization: currentUserToken
                }
            });
        }

        return next.handle(request);
    }
}

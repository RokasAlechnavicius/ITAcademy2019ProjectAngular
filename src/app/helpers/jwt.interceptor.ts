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
        const currentAdmin = JSON.parse(localStorage.getItem('currentAdmin'));
        const currentAdminToken = JSON.parse(localStorage.getItem('currentAdminToken'));
        if (currentUser && currentUserToken) {
            request = request.clone({
                setHeaders: {
                    Authorization: currentUserToken
                }
            });
        } else if (currentAdmin && currentAdminToken) {
            request = request.clone({
                setHeaders: {
                    Authorization: currentAdminToken
                }
            });
        }

        return next.handle(request);
    }
}

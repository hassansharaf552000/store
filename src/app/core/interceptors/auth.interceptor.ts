import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AUTH_CONSTANTS } from '../constants/auth.constants';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    // get token from local storage
    const TOKEN = localStorage.getItem(AUTH_CONSTANTS.TOKEN) || '';
    // Only add auth header for API requests
    if (request.url.includes('api') && TOKEN !== '') {
      request = request.clone({
        headers: request.headers.set(
          'Authorization',
          `Token ${TOKEN}`
        )
      });
    }

    return next.handle(request);
  }
}

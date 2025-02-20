import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AUTH_CONSTANTS, TOKEN } from '../constants/auth.constants';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    // Only add auth header for API requests
    if (request.url.includes('api')) {
      request = request.clone({
        headers: request.headers.set(
          'Authorization',
          `Basic ${TOKEN}`
        )
      });
    }

    return next.handle(request);
  }
}

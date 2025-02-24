import { HttpInterceptorFn } from '@angular/common/http';
import { AuthService } from './auth.service';
import { inject } from '@angular/core';

export const authTokenInteceptor: HttpInterceptorFn = (request, next) => {
  const token = inject(AuthService).token;

  if (!token) {
    return next(request);
  }

  request = request.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`,
    },
  });
  return next(request);
};

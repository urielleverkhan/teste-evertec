import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthServiceService } from '../shared/services/auth-server.service';

export const httpInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthServiceService);
  console.log('Interseptor');
  const autReq = req.clone({
    setHeaders: {
      Authorization: `Bearer ${authService.token() ? authService.token() : ''}`,
    },
  });
  return next(autReq);
};

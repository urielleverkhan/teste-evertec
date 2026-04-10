import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthServiceService } from '../shared/services/auth-server.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthServiceService);
  const router = inject(Router);
  console.log('auth');
  if (authService.token() || sessionStorage.getItem('token')) {
    if (sessionStorage.getItem('token')) {
      authService.token.set(sessionStorage.getItem('token'));
    }
    console.log('logado');
    return true;
  } else {
    console.log('desgolado');
    return router.parseUrl('/login');
  }
};

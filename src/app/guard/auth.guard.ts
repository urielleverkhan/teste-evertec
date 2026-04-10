import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthServerService } from '../shared/services/auth-server.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authServer = inject(AuthServerService);
  const router = inject(Router);
  alert(authServer.token());
  if (authServer.token()) {
    return true;
  } else {
    return router.parseUrl('/login');
  }
};

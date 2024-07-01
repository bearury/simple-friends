import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import {AuthService} from "../services/auth.service";

export const accessGuard: CanActivateFn = () => {
  const isAuth = inject(AuthService).isAuth

  if (isAuth) {
    return true
  }

  return inject(Router).createUrlTree(['/login']);
};

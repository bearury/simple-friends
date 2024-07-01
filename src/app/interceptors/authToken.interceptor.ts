import {HttpInterceptorFn} from '@angular/common/http';
import {inject} from "@angular/core";
import {AuthService} from "../services/auth.service";

export const authTokenInterceptor: HttpInterceptorFn = (req, next) => {
  const token = inject(AuthService).token

  if (!token) return next(req)


  req = req.clone({
    setHeaders: {'X-Parse-Session-Token': token}
  })

  return next(req)
};

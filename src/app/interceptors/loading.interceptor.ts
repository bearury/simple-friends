import {HttpInterceptorFn} from '@angular/common/http';
import {inject} from "@angular/core";
import {LoaderService} from "../services/loader.service";
import {delay, tap} from "rxjs";

export const loadingInterceptor: HttpInterceptorFn = (req, next) => {
  const loaderService = inject((LoaderService))

  loaderService.setLoading(true)

  return next(req).pipe(
    delay(2000),
    tap(() => {
        if (loaderService.getLoading()) {
          loaderService.setLoading(false)
        }
      }
    )
  );
};

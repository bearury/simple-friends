import {HttpHandlerFn, HttpInterceptorFn} from '@angular/common/http';
import {catchError, throwError} from "rxjs";
import {inject} from "@angular/core";
import {LoaderService} from "../services/loader.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {ErrorResponse} from "./types";


export const apiErrorInterceptor: HttpInterceptorFn = (request, next: HttpHandlerFn) => {
  const loaderService: LoaderService = inject(LoaderService)
  const snackBar: MatSnackBar = inject(MatSnackBar);

  snackBar.handsetCssClass = 'test-test-etst-test-set-ettest-test'

  return next(request).pipe(
    catchError((error: ErrorResponse) => {
      // Обработка ошибки, например, отображение сообщения об ошибке
      console.error('Произошла ошибка:', error);

      snackBar.open(error.error.error, 'OK')

      loaderService.setLoading(false)
      return throwError(error);
    })
  );
};

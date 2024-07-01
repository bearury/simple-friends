import {ChangeDetectionStrategy, Component, inject, OnInit, signal} from '@angular/core';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {FormControl, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {merge} from "rxjs";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {MatButtonModule} from "@angular/material/button";
import {AuthService} from "../../../services/auth.service";
import {ActivatedRoute, Router} from "@angular/router";
import {LoaderService} from "../../../services/loader.service";
import {RouterPath} from "../../../app.routes";
import {NgIf} from "@angular/common";


@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, FormsModule, ReactiveFormsModule, MatButtonModule, NgIf],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthComponent implements OnInit {

  readonly email = new FormControl<string | null>('', [Validators.required, Validators.email]);
  readonly password = new FormControl<string | null>('', [
    Validators.required,
    Validators.pattern(/^(?=.*[0-9])(?=.*[A-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/)]
  );
  readonly confirmPassword = new FormControl<string | null>('', [
    Validators.required]);

  readonly loaderService = inject(LoaderService)

  isLoginPage = false
  disabledButton = true
  errors = new Map();

  constructor(
    readonly authService: AuthService,
    readonly router: Router,
    readonly activatedRoute: ActivatedRoute,
  ) {
    merge(this.email.statusChanges, this.email.valueChanges)
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.updateErrorMessage(this.email));
    merge(this.password.statusChanges, this.password.valueChanges)
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.updateErrorMessage(this.password));
    merge(this.confirmPassword.statusChanges, this.confirmPassword.valueChanges)
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.updateErrorMessage(this.confirmPassword));


    this.errors.set(this.email, signal(''))
    this.errors.set(this.password, signal(''))
    this.errors.set(this.confirmPassword, signal(''))
  }

  ngOnInit(): void {
    this.isLoginPage = this.activatedRoute.snapshot.url[0].path === RouterPath.Login;
  }

  handleChangePage(): void {
    this.router.navigate([this.isLoginPage ? RouterPath.Signup : RouterPath.Login]);
  }


  updateErrorMessage(form: FormControl<string | null>): void {
    const error = form.hasError('required')
    if (error) {
      this.errors.get(form).set('Поле не может быть пустым');
    } else if (error || form === this.password && !form.hasError('pattern')) {
      this.errors.get(form).set('Пароль должен быть не менне 6 символов');
    } else if (form.hasError('email')) {
      this.errors.get(form).set('Email должен быть корректным');
    } else if (form.hasError('pattern')) {
      this.errors.get(form).set('Пароль должен быть не менне 6 символов, содержать cпец.символы и буквы латинского алфавита');
    } else if (this.password && this.confirmPassword && this.password.value !== this.confirmPassword.value) {
      this.errors.get(form).set('Пароли должны совпадать');
    }


    this.disabledButton = !(this.email.status === 'VALID' && this.password.status === 'VALID') ||
      (!this.isLoginPage && this.password.value !== this.confirmPassword.value);
  }

  submit(): void {
    if (this.email.value && this.password.value) {

      if (this.isLoginPage) {
        this.authService.login({email: this.email.value, password: this.password.value}).subscribe(() => {
          this.router.navigate([''])
        })
      } else {
        this.authService.signin({email: this.email.value, password: this.password.value}).subscribe(() => {
          this.router.navigate([''])
        })
      }
    } else {
      throw Error('Email or password is empty');
    }
  }
}

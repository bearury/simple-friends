import {ChangeDetectionStrategy, Component, signal} from '@angular/core';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {FormControl, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {merge} from "rxjs";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {MatButtonModule} from "@angular/material/button";
import {AuthService} from "../../../services/auth.service";
import {Router} from "@angular/router";
import {LoaderService} from "../../../services/loader.service";


@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, FormsModule, ReactiveFormsModule, MatButtonModule],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthComponent {

  readonly email = new FormControl<string | null>('', [Validators.required, Validators.email]);
  readonly password = new FormControl<string | null>('', [
    Validators.required,
    Validators.pattern(/^(?=.*[0-9])(?=.*[A-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/)]
  );

  disabledButton = true

  errors = new Map();

  constructor(
    readonly authService: AuthService,
    readonly router: Router,
    readonly loaderService: LoaderService
  ) {
    merge(this.email.statusChanges, this.email.valueChanges)
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.updateErrorMessage(this.email));
    merge(this.password.statusChanges, this.password.valueChanges)
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.updateErrorMessage(this.password));

    this.errors.set(this.email, signal(''))
    this.errors.set(this.password, signal(''))
  }

  updateErrorMessage(form: FormControl<string | null>) {
    const error = form.hasError('required')
    if (error) {
      this.errors.get(form).set('Поле не может быть пустым');
    } else if (error || form === this.password && !form.hasError('pattern')) {
      this.errors.get(form).set('Пароль должен быть не менне 6 символов');
    } else if (form.hasError('email')) {
      this.errors.get(form).set('Email должен быть корректным');
    } else if (form.hasError('pattern')) {
      this.errors.get(form).set('Пароль должен быть не менне 6 символов, содержать cпец.символы и буквы латинского алфавита');
    }

    this.disabledButton = !(this.email.status === 'VALID' && this.password.status === 'VALID');
  }

  submit() {
    if (this.email.value && this.password.value) {
      this.authService.login({email: this.email.value, password: this.password.value}).subscribe(() => {
        this.router.navigate([''])
      })
    } else {
      throw Error('Email or password is empty');
    }
  }
}

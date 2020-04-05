import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';

import { AuthenticationService } from '../../services/authentication.service';
import { UserDto } from '../../shared/user-dto';
import { DescriptorFormControl } from '../../descriptor/descriptor-form-control';
import { FormService } from '../../services/form.service';

@Component({
  selector: 'vedrax-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class VedraxLoginComponent implements OnInit, OnDestroy {

  private subscription: Subscription = new Subscription();

  /**
   * Login form control descriptor
   */
  @Input() controls: DescriptorFormControl[] = [];

  /**
   * URL for accessing the register page if any
   */
  @Input() registerPage?: string;

  /**
   * redirection url after success login
   */
  returnUrl: string;

  /**
   * login state
   */
  submitted: boolean = false;

  /**
   * error message
   */
  error: string;

  /**
   * The form object
   */
  formLogin: FormGroup;

  constructor(
    private formService: FormService,
    private authenticationService: AuthenticationService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.formLogin = this.formService.createFormGroup(this.controls);
    // get return url from route parameters or default to '/dashboard' when authenticated
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/dashboard';
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  submit(dto: UserDto) {
    if (this.formLogin.valid) {
      this.submitted = true;

      this.subscription.add(this.authenticationService.login(dto)
        .pipe(
          catchError(err => this.error = err && err.message),
          finalize(() => {
            this.submitted = false;
          }))
        .subscribe(() => {
          this.router.navigate([this.returnUrl]);
        }));
    }
  }

}

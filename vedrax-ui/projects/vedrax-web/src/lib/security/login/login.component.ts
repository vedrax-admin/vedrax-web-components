import { Component, OnInit, Input, OnDestroy, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { AuthenticationService } from '../../services/authentication.service';
import { UserDto } from '../../shared/user-dto';
import { VedraxFormComponent } from '../../form-controls/vedrax-form/vedrax-form.component';
import { DescriptorForm } from '../../descriptor/descriptor-form';

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
  @Input() descriptor: DescriptorForm;

  /**
   * When true can redirect to register page
   */
  enableCancel?: boolean = false;

  /**
   * URL for accessing the register page if any
   */
  @Input() registerPage?: string;

  /**
   * redirection url after success login
   */
  returnUrl: string;

  /**
   * The submit label
   */
  submitLabel: string = 'Se connecter';

  /**
   * The form component
   */
  @ViewChild(VedraxFormComponent) formComponent: VedraxFormComponent;

  constructor(
    private authenticationService: AuthenticationService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    if (this.registerPage) {
      this.enableCancel = true;
    }
    // get return url from route parameters or default to '/dashboard' when authenticated
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/dashboard';
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  submit(dto: UserDto) {
    this.subscription.add(this.authenticationService.login(dto, this.descriptor.endpoint)
      .pipe(
        finalize(() => {
          this.formComponent.end();
        }))
      .subscribe(() => {
        this.router.navigate([this.returnUrl]);
      }));

  }

  redirectToRegister(event: boolean) {
    if (event) {
      this.router.navigate([this.registerPage]);
    }
  }

}

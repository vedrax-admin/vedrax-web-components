import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';

import { VedraxLoginComponent } from './login.component';
import { AuthenticationService } from '../../services/authentication.service';
import { User } from '../../shared/user.model';
import { MockActivatedRoute } from '../../util/activated-route.mock';
import { UserDto } from '../../shared/user-dto';
import { DescriptorFormControl } from '../../descriptor/descriptor-form-control';
import { FormGroup } from '@angular/forms';
import { FormService } from '../../services/form.service';

class MockRouter {
  navigate(path) { }
}

class AuthenticationServiceStub {

  login(dto:UserDto) {
    return of(new User());
  }
}

class FormServiceMock {

  createFormGroup(descriptors: DescriptorFormControl[] = []): FormGroup {
    return new FormGroup({});
  }

}

describe('LoginComponent', () => {
  let component: VedraxLoginComponent;
  let fixture: ComponentFixture<VedraxLoginComponent>;
  let router: Router;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule
      ],
      declarations: [VedraxLoginComponent],
      providers: [
        { provide: FormService, useClass: FormServiceMock },
        { provide: AuthenticationService, useClass: AuthenticationServiceStub },
        { provide: ActivatedRoute, useClass: MockActivatedRoute },
        { provide: Router, useClass: MockRouter }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VedraxLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    router = TestBed.get(Router);
  });

  
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to dashboard when submitting', () => {
    component.ngOnInit();

    spyOn(router, 'navigate');

    component.submit({ email: 'pp', password: 'pwd' });

    expect(router).toHaveBeenCalledWith('/dashbord');
    expect(component.submitted).toBe(false);
  });
});

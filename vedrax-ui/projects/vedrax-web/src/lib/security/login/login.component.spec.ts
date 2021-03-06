import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { VedraxLoginComponent } from './login.component';
import { AuthenticationService } from '../../services/authentication.service';
import { User } from '../../shared/user.model';
import { UserDto } from '../../shared/user-dto';

const router = {
  navigate: jasmine.createSpy('navigate')
}

class AuthenticationServiceStub {

  login(dto: UserDto) {
    return of(new User());
  }
}

describe('LoginComponent', () => {
  let component: VedraxLoginComponent;
  let fixture: ComponentFixture<VedraxLoginComponent>;
  let router: Router;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        NoopAnimationsModule
      ],
      declarations: [VedraxLoginComponent],
      providers: [
        { provide: AuthenticationService, useClass: AuthenticationServiceStub },
        {
          provide: ActivatedRoute, useValue: {
            snapshot: {
              queryParams: {
                get: () => '/',
              },
            },
          }
        },
        { provide: Router, useValue: router }
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
});

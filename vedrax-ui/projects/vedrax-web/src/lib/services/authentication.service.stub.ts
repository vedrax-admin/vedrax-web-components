import { Observable, of } from 'rxjs';
import { User } from '../shared/user.model';
import { UserDto } from '../shared/user-dto';
import { Role } from '../shared/role.enum';

const SIMPLE_USER: User = {
    email: 'elodie.penchenat@vedrax.com',
    fullName: 'Elodie Penchenat',
    userRole: Role.USER,
    token: 'token'
}

export class AuthenticationServiceStub {

    private user: User;

    public currentUserObs: Observable<User> = of(SIMPLE_USER);

    get currentUserValue(): User {
        return this.user;
    };

    setAuthentication(user: User) {
        this.user = user;
    }

    login(dto:UserDto){}

    logout() { }

}
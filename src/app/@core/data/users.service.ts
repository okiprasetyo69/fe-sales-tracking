
import { of as observableOf } from 'rxjs';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { OauthService } from '../../services/oauth.service';


let counter = 0;

@Injectable()
export class UserService {
  default_picture = 'assets/images/user.png';
  user = 'User';
  username = 'please login';
  private users = {
    user: {name: this.user, picture: this.default_picture, username: this.username},
  };

  private userArray: any[];

  constructor(
    private oauthService: OauthService,
  ) {
    // this.userArray = Object.values(this.users);
  }

  setUser(user) {
    this.user = user;
  }

  getUsers(): Observable<any> {
    const userProfile = this.oauthService.getProfile();
    // console.info(userProfile['name']);
    this.users.user.name = userProfile['name'];
    this.users.user.username = userProfile['username'];
    return observableOf(this.users);
  }

  getUserArray(): Observable<any[]> {
    return observableOf(this.userArray);
  }

  getUser(): Observable<any> {
    counter = (counter + 1) % this.userArray.length;
    return observableOf(this.userArray[counter]);
  }
}

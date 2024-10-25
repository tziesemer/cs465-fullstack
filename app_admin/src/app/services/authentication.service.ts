import { Inject, inject, Injectable } from '@angular/core';
import { BROWSER_STORAGE } from '../storage';
import { User } from '../models/user';
import { Authresponse } from '../models/authresponse';
import { TripDataService } from './trip-data.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(@Inject(BROWSER_STORAGE) private storage: Storage,
private tripDataService: TripDataService) { }

public getToken (): string  {
  let tempToken = JSON.stringify(this.storage.getItem('travlr-token'));
  return JSON.parse(tempToken);
}

public saveToken (token: string): void {
  this.storage.setItem('travlr-token', token);
}

public login(user: User): void {
  let voidAuth = new Authresponse();
  let testOne = this.tripDataService.login(user)
    .then((authResp: Authresponse) =>
      this.saveToken(authResp.token));
}

public register(user: User): void {
  let regRes = this.tripDataService.register(user)
      .then((authResp: Authresponse) =>
        this.saveToken(authResp.token));
}

public logout (): void {
  this.storage.removeItem('travlr-token');
}

public isLoggedIn (): boolean {
  const token = this.getToken();
  //console.log(token);
  //console.log('AuthenticationService::isLoggedin');
  if (token) {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.exp > (Date.now() / 1000);
  } else {
    return false;
  }
}

public getCurrentUser() : User {
  let tempUser = new User();
  if(this.isLoggedIn()) {
    const token: string = this.getToken();
    const { email, name } =
    JSON.parse(atob(token.split('.')[1]));
    tempUser.email = email;
    tempUser.name = name;
    return tempUser;
  }else {
    return tempUser;
  }
}
}

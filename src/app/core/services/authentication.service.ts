import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

import { LoginAuth, JwtResponse, UserToken } from '../models/authentication.model';
import { User } from '../models/user.model';

import * as decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor(private http: HttpClient, private router: Router) {
    this.currentUserSubject = new BehaviorSubject<User>(this.tokenToUser(localStorage.getItem('currentUser')));

    this.currentUser = this.currentUserSubject.asObservable();
  }

  public login(auth: LoginAuth): Observable<User> {
    return this.http
      .post<JwtResponse>(`${environment.api}/login`, {
        username: auth.username,
        password: auth.password
      })
      .pipe(
        map(jwt => {
          localStorage.setItem('currentUser', jwt.token);

          const user = this.tokenToUser(jwt.token);
          this.currentUserSubject.next(user);

          return user;
        })
      );
  }

  public logout() {
    this.clearSession();
    this.router.navigate(['/login']);
  }

  public clearSession() {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }

  public currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  public getTokenBody() {
    try {
      return decode(localStorage.getItem('currentUser'));
    } catch {
      return null;
    }
  }

  private tokenToUser(token: string): User {
    try {
      const user: UserToken = decode(token);

      return {
        username: user.username,
        email: user.email
      };
    } catch {
      return null;
    }
  }
}

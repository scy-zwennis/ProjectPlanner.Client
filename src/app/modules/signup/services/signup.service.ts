import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { UserRegister, User } from 'src/app/core/models/user.model';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

import * as jwt from 'jwt-simple';

@Injectable({
  providedIn: 'root'
})
export class SignupService {
  constructor(private http: HttpClient) {}

  public register(userInfo: UserRegister): Observable<User> {
    const token = jwt.encode(userInfo, environment.secret);

    return this.http.post<User>(`${environment.api}/accounts/register`, { token });
  }
}

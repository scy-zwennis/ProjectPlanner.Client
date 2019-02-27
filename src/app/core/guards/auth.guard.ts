import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, Router } from '@angular/router';

import { AuthenticationService } from '../services/authentication.service';
import { UserToken } from '../models/authentication.model';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private authService: AuthenticationService
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const user: UserToken = this.authService.getTokenBody();

    if (user) {
      const expiration = new Date(0);
      expiration.setUTCSeconds(user.exp);

      if (new Date() < expiration) {
        return true;
      }
    }

    this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
    return false;
  }
}

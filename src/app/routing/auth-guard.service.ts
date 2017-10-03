import { Injectable }     from '@angular/core';
import { CanActivate,
         Router }         from '@angular/router';

import { AuthService }    from '../authentification/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private authService:  AuthService,
    private router:       Router
  ) {};

  canActivate() {
    // if not logged in
    if(!this.authService.isLoggedIn) {
      // redirect to the login page
      this.router.navigate(['/login']);
    }

    return this.authService.isLoggedIn;
  }
}
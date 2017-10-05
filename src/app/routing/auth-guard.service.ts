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
    let isLoggedIn  = this.authService.isLogged();

    // if not logged in
    if(isLoggedIn) {
      // redirect to the login page
      this.router.navigate(['/login']);
    }

    return isLoggedIn;
  }
}
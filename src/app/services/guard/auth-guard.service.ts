import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate{

  constructor(private router: Router) { }
  private isAuthenticated: boolean = true;

  canActivate() {
    if (!this.isAuthenticated) {
      // redirect to some view explaining what happened
      this.router.navigateByUrl('/');
      return false;
    } else {
      return true;
    }
  }
}

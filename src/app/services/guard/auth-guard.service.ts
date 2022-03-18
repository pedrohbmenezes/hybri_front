import { TokenService } from './../token/token.service';
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate{

  constructor(private router: Router, private tokenService: TokenService) { }
  private isAuthenticated: boolean = false;

  canActivate() {
    if (!this.tokenService.getToken()) {
      this.isAuthenticated = false
      this.router.navigateByUrl('/');
      return false;
    } else {
      this.isAuthenticated = true
      console.log(this.tokenService.getToken())
      return true;
    }
  }
}

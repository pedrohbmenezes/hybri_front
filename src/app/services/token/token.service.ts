import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';
@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor(private router:Router) { }
  signOut(): void {
    window.sessionStorage.clear();
  }

  public saveToken(token: string): void {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
    setTimeout(() => {
      this.signOut()
      this.router.navigateByUrl('/')
    },120000)
  }

  public getToken(): string | null {
    return window.sessionStorage.getItem(TOKEN_KEY);
  }

  public saveUser(user: any): void {
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  public getUser(): any {
    const user = window.sessionStorage.getItem(USER_KEY);
    if (user) {
      return JSON.parse(user);
    }

    return {};
  }
}

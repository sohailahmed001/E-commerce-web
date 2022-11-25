import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class UserAuthService {
  constructor() {}

  setToken(jwtToken: string) {
    localStorage.setItem('jwtToken', jwtToken);
  }

  setRoles(roles: []) {
    localStorage.setItem('roles', JSON.stringify(roles));
  }

  getToken(): string {
    return localStorage.getItem('jwtToken');
  }

  getRoles(): any[] {
    return JSON.parse(localStorage.getItem('roles'));
  }

  clear() {
    localStorage.clear();
  }

  isLoggedIn(): boolean {
    return this.getRoles() && this.getToken() ? true : false;
  }
}

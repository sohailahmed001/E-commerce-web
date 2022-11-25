import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { UserAuthService } from './user-auth.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  requestHeader = new HttpHeaders({ 'No-Auth': 'True' });

  constructor(
    private httpClient: HttpClient,
    private userAuthService: UserAuthService
  ) {}

  login(data: any) {
    return this.httpClient.post(`${environment.baseUrl}/authenticate`, data, {
      headers: this.requestHeader,
    });
  }

  forUser() {
    return this.httpClient.get(`${environment.baseUrl}/forUser`, {
      responseType: 'text',
    });
  }

  forAdmin() {
    return this.httpClient.get(`${environment.baseUrl}/forAdmin`, {
      responseType: 'text',
    });
  }

  roleMatch(allowedRoles: any[]): boolean {
    const userRoles = this.userAuthService.getRoles() || [];
    for (let userRole of userRoles) {
      if (allowedRoles.some((role) => role == userRole['roleName'])) {
        return true;
      }
    }

    return false;
  }
}

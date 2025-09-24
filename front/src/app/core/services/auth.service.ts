import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponse } from '../../models/api-reponse';
import { Credentials } from '../../models/credentials';
import { ApiService } from './api.service';

@Injectable({ 
    providedIn: 'root' 
})
export class AuthService {
  private loggedIn: boolean = false;
  
  constructor(private api: ApiService) {}

  login(credentials: Credentials): Observable<ApiResponse> {
    this.loggedIn = true;
    return this.api.post<ApiResponse>('auth/login', credentials);
  }

  register(credentials: Credentials): Observable<ApiResponse> {
    return this.api.post<ApiResponse>('auth/register', credentials)
  }

  logout(): Observable<ApiResponse> {
    this.loggedIn = false;
    return this.api.post<ApiResponse>('auth/logout', {});
  }

  isLoggedIn(): boolean {
    return this.loggedIn;
  }
  
}

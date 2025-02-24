import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { tap } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { TokenResponse } from './auth.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  http = inject(HttpClient);
  baseApiUrl = 'https://icherniakov.ru/yt-course/auth';
  cookieService = inject(CookieService);

  token: string | null = null;
  refreshToken: string | null = null;

  get isAuth() {
    if (!this.token) {
      this.token = this.cookieService.get('token');
      console.log(this.token);
    }

    return !!this.token;
  }

  login(payload: { username: string; password: string }) {
    const fd = new FormData();
    fd.append('username', payload.username);
    fd.append('password', payload.password);

    return this.http.post<TokenResponse>(`${this.baseApiUrl}/token`, fd).pipe(
      tap((val) => {
        console.log('Login response:', val);
        const tokenResponse = {
          accessToken: val.access_token,
          refreshToken: val.refresh_token,
          tokenType: val.token_type,
        };
        this.token = tokenResponse.accessToken;
        this.refreshToken = tokenResponse.refreshToken;
        this.cookieService.set('token', tokenResponse.accessToken);
        this.cookieService.set('refreshToken', tokenResponse.refreshToken);
      })
    );
  }
}

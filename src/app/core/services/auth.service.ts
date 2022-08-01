import { Injectable } from '@angular/core';
import { ApiService, ApiResult } from './api.service';
import {
    generateSalt,
    encryptSecret,
} from '../helpers/util.helper';
import { HttpParams } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { CookieService } from './cookie.service';
import { config } from 'src/environments/config';
export interface SignInTicket {
    expires_at: string;
    iv: string;
}

export interface SignInResult {
    account_id: string;
    access_token: string;
    refresh_token: string;
    token_type: string;
    expires_at: number;
    session_uid: string;
}

export interface AccountProfile {
    account_id: string;
    name: string;
}

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private isAuth: boolean | undefined;
    private profile: AccountProfile | undefined;

    constructor(
        private apiService: ApiService,
        private router: Router,
    ) { }

    verifyCode = async (token: string, provider: string): Promise<ApiResult | undefined> => {
        this.resetAuthorized();
        const challenge = generateSalt(32);
        const params = new HttpParams().append('challenge', `${challenge}`).append(`provider`, `${provider}`);
        const r = await this.apiService
            .get(`/v1/auth/ticket`, params)
            .toPromise()
            .then((result) => {
                return result?.data;
            });
        if (r === undefined) {
            return undefined;
        }
        const secret = encryptSecret(JSON.stringify({ token: token }), challenge, (r as SignInTicket).iv);
        const data = {
            secret,
            remember: false,
        } as object;
        return this.apiService
            .post(`/v1/auth/verify`, data)
            .pipe(
                tap(
                    (result) => {
                        const signedIn = result.data as SignInResult;
                        localStorage.setItem('challenge', challenge);
                        localStorage.setItem('logged_in', JSON.stringify(result.data))
                        CookieService.setCookie(`${config.session_key}`, `${signedIn.access_token}`, 0, `/`);
                        this.isAuth = true;
                    },
                    () => {
                        this.resetAuthorized();
                    }
                )
            )
            .toPromise();
    }

    isAuthorizedAccess = async (): Promise<boolean> => {
        if (this.isAuth === undefined) {
            return this.apiService
                .get('/v1/auth')
                .toPromise()
                .then(() => {
                    this.isAuth = true;
                    return true;
                })
                .catch((err) => {
                    if (err.error.msg === 'forbidden') {
                        this.router.navigateByUrl(`/error?cause=err403`);
                        return true;
                    }
                    this.isAuth = false;
                    this.clearSessionCookie();
                    return false;
                });
        }
        return this.isAuth;
    }

    resetAuthorized = (): void => {
        this.clearSessionCookie();
        this.isAuth = false;
    }

    signOut = async (): Promise<ApiResult | undefined> => {
        const r = await this.apiService.delete(`/v1/auth/session`, null).toPromise();
        this.resetAuthorized();
        return r;
    }

    private clearSessionCookie = (): void => {
        localStorage.clear();
        CookieService.deleteCookie(`${config.session_key}`);
    }
}

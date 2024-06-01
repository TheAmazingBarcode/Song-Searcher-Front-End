import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { jwtDecode, JwtPayload } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class ApiKeyService {

  constructor() { }

  public storeKey(key: String): void { localStorage.setItem("api", key as string) }

  public getKey(): String { return localStorage.getItem("api") ?? '' }

  public deleteKey(): void{localStorage.removeItem("api")}

  public isExpired(): Boolean {
    const token = this.getKey() as string;

    if(token == '')
      return true;

    const payload: JwtPayload = jwtDecode(token);

    if (payload.exp!*1000 < new Date().getTime())
      return true;

    return false;
  }
}

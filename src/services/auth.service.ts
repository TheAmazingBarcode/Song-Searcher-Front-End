import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiKeyService } from './api-key.service';
import { Observable } from 'rxjs';
import config from '../assets/api.json'
import { User } from '../models/User';
import { UserDto } from '../models/UserDto';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient,
    private keyService: ApiKeyService
  ) { }

  public register(user: User): Observable<String> {
    return this.http.post<String>(config.baseURL + config.port + config.auth + config.reg, user,{responseType:'text' as 'json'});
  }

  public logIn(user: UserDto): Observable<String> {
    return this.http.put<String>(config.baseURL + config.port + config.auth + config.login, user,{responseType:'text' as 'json'});
  }
}

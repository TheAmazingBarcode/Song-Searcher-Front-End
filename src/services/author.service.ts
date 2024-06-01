import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Author } from '../models/Author';
import config from '../assets/api.json'

@Injectable({
  providedIn: 'root'
})
export class AuthorService {

  constructor(private http:HttpClient) { }

  public getAllAuthors():Observable<Author[]>{
      return this.http.get<Author[]>(config.baseURL+config.port+config.author+config.all);
  }
}

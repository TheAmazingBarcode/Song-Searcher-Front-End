import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import config from '../assets/api.json'
import { Observable } from 'rxjs';
import { Genre } from '../models/Genre';

@Injectable({
  providedIn: 'root'
})
export class GenreService {

  constructor(private http:HttpClient) { }

  public getAllGenres():Observable<Genre[]>{
    return this.http.get<Genre[]>(config.baseURL+config.port+config.genre+config.all);
  }
  
}

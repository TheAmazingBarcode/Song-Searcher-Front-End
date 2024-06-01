import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Lyrics } from '../models/Lyrics';
import { SearchDTO } from '../models/Search';
import config from '../assets/api.json';
import { query } from '@angular/animations';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(private http:HttpClient) {}

  public searchByGenre(genreName:String):Observable<Lyrics[]>{
    const search = new SearchDTO("genre","term",genreName);

    const query:SearchDTO[] = [];
    query.push(search);

    return this.http.post<Lyrics[]>(config.baseURL+config.port+config.lyrics+config.category,query);
  }

  public searchByLyrics(lyrics:String):Observable<Lyrics[]>{
    const search = new SearchDTO("lyrics","phrase-lyrics",lyrics);

    const query:SearchDTO[] = [];
    query.push(search);

    return this.http.post<Lyrics[]>(config.baseURL+config.port+config.search,query);
  }

  public searchByAuthor(authorFullName:String):Observable<Lyrics[]>{
    const search = new SearchDTO("names","phrase",authorFullName);
    const query:SearchDTO[] = [];
    query.push(search);

    return this.http.post<Lyrics[]>(config.baseURL+config.port+config.lyrics+config.category,query)
  }

  public searchByPerformer(names:String[]):Observable<Lyrics[]>{
    const query:SearchDTO[] = []
    names.forEach(name =>  query.push(new SearchDTO("names","phrase",name)));

    return this.http.post<Lyrics[]>(config.baseURL+config.port+config.lyrics+config.category,query);
  }

}

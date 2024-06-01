import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Lyrics } from '../models/Lyrics';
import config from '../assets/api.json'

@Injectable({
  providedIn: 'root'
})
export class LyricsService {
  private lyricsCache!:Lyrics[];

  constructor(private http:HttpClient) {}

  public getLyricsFromAPICache():Observable<Lyrics[]>{
    return this.http.get<Lyrics[]>(config.baseURL+config.port+config.fast+config.all);
  }

  public getAllLyrics():Observable<Lyrics[]>{
    return this.http.get<Lyrics[]>(config.baseURL+config.port+config.lyrics+config.all);
  }

  public setCache(lyricsArr: Lyrics[]):void{
    this.lyricsCache = lyricsArr;
  }

  public getCache() :Lyrics[]{
    return this.lyricsCache;
  }
}

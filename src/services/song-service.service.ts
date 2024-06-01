import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Author } from '../models/Author';
import { Song } from '../models/Song';
import { Genre } from '../models/Genre';
import { Performer } from '../models/Performer';
import { Lyrics } from '../models/Lyrics';
import config from '../assets/api.json'
import { Observable, of } from 'rxjs';
import { ApiKeyService } from './api-key.service';

@Injectable({
  providedIn: 'root'
})

export class SongServiceService {

  constructor(private http: HttpClient
    , private keyService:ApiKeyService
  ) { }

  private authHeaders():HttpHeaders{
    return new HttpHeaders({Authorization:'Bearer '+this.keyService.getKey()})
  }

  public getAllSongs(): Observable<Song[]> {
    return this.http.get<Song[]>(config.baseURL + config.port + config.song + config.all);
  }

  public uploadSong(song: Song): Observable<Song> {
    return this.http.post<Song>((config.baseURL + config.port + config.song + config.new), song,{headers:this.authHeaders()});
  }

  public updateSong(song:Song):Observable<Song>{
    return this.http.put<Song>((config.baseURL + config.port + config.song + config.update), song,{headers:this.authHeaders()});
  }

  public getSongsByLyrics(ids:String[]):Observable<Song[]> {
    return this.http.post<Song[]>((config.baseURL+config.port+config.song+config.search),ids);
  }

  public getSongsByGenre(name:string):Observable<Song[]> {
    return this.http.get<Song[]>(config.baseURL+config.port+config.song+config.genre+'/'+name);
  }

  public getSongsByAuthor(id:number):Observable<Song[]>{
    return this.http.get<Song[]>(config.baseURL+config.port+config.song+config.author+'/'+id);
  }

  public getSongsByPerformer(id:number):Observable<Song[]>{
    return this.http.get<Song[]>(config.baseURL+config.port+config.song+config.performer+'/'+id);
  }

  public deleteSong(id:number):Observable<Boolean>{
    return this.http.delete<Boolean>(config.baseURL+config.port+config.song+config.delete+'/'+id,{headers:this.authHeaders()});
  }

}

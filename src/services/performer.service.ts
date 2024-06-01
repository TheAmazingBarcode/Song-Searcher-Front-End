import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Performer } from '../models/Performer';
import config from '../assets/api.json'

@Injectable({
  providedIn: 'root'
})
export class PerformerService {

  constructor(private http:HttpClient) {}

  public getAllPerformers():Observable<Performer[]>{
    return this.http.get<Performer[]>(config.baseURL+config.port+config.performer+config.all)
  }
}

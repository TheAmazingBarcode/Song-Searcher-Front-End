import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Genre } from '../../models/Genre';
import { GenreService } from '../../services/genre.service';
import { GenreCardComponent } from '../genre-card/genre-card.component';

@Component({
  selector: 'app-genre',
  standalone: true,
  imports: [RouterOutlet,CommonModule,GenreCardComponent],
  templateUrl: './genre.component.html',
  styleUrl: './genre.component.css'
})
export class GenreComponent implements OnInit{
  genres!:Genre[];

  constructor(private genreService:GenreService){}
  
  ngOnInit(): void {
    this.loadGenres();
  }

  private loadGenres():void{
    this.genreService.getAllGenres().subscribe(data=>this.genres = data);
  }


}

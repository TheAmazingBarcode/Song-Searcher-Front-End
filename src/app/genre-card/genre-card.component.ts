import { Component, Input, OnInit } from '@angular/core';
import { Genre } from '../../models/Genre';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-genre-card',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './genre-card.component.html',
  styleUrl: './genre-card.component.css'
})
export class GenreCardComponent{
  @Input() genre!:Genre
}

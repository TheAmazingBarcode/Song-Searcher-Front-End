import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { AuthorService } from '../../services/author.service';
import { Author } from '../../models/Author';
import { AuthorCardComponent } from '../author-card/author-card.component';

@Component({
  selector: 'app-author',
  standalone: true,
  imports: [RouterOutlet, CommonModule, AuthorCardComponent],
  templateUrl: './author.component.html',
  styleUrl: './author.component.css'
})
export class AuthorComponent implements OnInit {
  authors!: Author[]

  constructor(private authorService: AuthorService) { }

  ngOnInit(): void {
    this.loadAuthors();
  }

  private loadAuthors(): void {
    this.authorService.getAllAuthors().subscribe(data => this.authors = data);
  }

}

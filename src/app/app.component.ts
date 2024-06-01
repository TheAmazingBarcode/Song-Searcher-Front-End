import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { Song } from '../models/Song';
import { CommonModule } from '@angular/common';
import { SongComponent } from './song/song.component';
import { NavbarComponent } from './navbar/navbar.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,CommonModule,SongComponent,NavbarComponent,RouterLink,RouterLinkActive],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers: []
})

export class AppComponent implements OnInit{
  ngOnInit(): void {
  }
}

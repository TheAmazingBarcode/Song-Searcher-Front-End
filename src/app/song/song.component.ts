import { Component, Input, OnInit } from '@angular/core';
import { Song } from '../../models/Song';
import { LyricsService } from '../../services/lyrics.service';
import { Lyrics } from '../../models/Lyrics';
import { DataBridgeService } from '../../services/data-bridge.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-song',
  standalone: true,
  imports: [],
  templateUrl: './song.component.html',
  styleUrl: './song.component.css'
})
export class SongComponent {
  @Input() song!: Lyrics

  constructor(private lyricsService: LyricsService
    , private dataService: DataBridgeService
    , private router: Router) { }


  public navigate(): void {
    this.dataService.setData(this.song);
    this.router.navigate(['/detailed/song'])
  }
}

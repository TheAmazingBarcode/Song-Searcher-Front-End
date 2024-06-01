import { Component, OnInit } from '@angular/core';
import { Song } from '../../models/Song';
import { DataBridgeService } from '../../services/data-bridge.service';
import { SongServiceService } from '../../services/song-service.service';
import { Lyrics } from '../../models/Lyrics';
import { CommonModule } from '@angular/common';
import { Author } from '../../models/Author';
import { Router } from '@angular/router';
import { Performer } from '../../models/Performer';
import { RouterLink } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPenSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
import { ApiKeyService } from '../../services/api-key.service';

@Component({
  selector: 'app-song-detailed',
  standalone: true,
  imports: [CommonModule, RouterLink, FontAwesomeModule],
  templateUrl: './song-detailed.component.html',
  styleUrl: './song-detailed.component.css'
})
export class SongDetailedComponent implements OnInit {
  song!: Song;
  faTrash = faTrash;
  faEdit = faPenSquare;

  constructor(private dataService: DataBridgeService
    , private songService: SongServiceService
    , private router: Router
    , private keyService: ApiKeyService) { }

  ngOnInit(): void {
    const lyricsIdArr: String[] = [];
    const lyricsObj: Lyrics = this.dataService.getData();

    lyricsIdArr.push(lyricsObj.id)

    this.songService.getSongsByLyrics(lyricsIdArr).subscribe(data => {
      const song = data.pop()!;
      this.song = song;
      this.song!.lyrics = lyricsObj.lyrics;
    })
  }

  navigateAuthor(author: Author): void {
    this.dataService.setData(author);
    this.router.navigate(['/songs/author/' + author.firstName + ' ' + author.lastName])
  }

  navigatePerformer(performer: Performer): void {
    this.dataService.setData(performer);
    this.router.navigate(['/songs/author/' + performer.artistName])
  }

  deleteSong() {
    if (confirm('Do you want to delete this song?')) {
      this.songService.deleteSong(this.song.id as number).subscribe((data) => {
        if (data) this.router.navigate(['/'])
      },
        (error) => alert('Delete failed'));
    }
  }

  editSong() {
    this.dataService.setData(this.song);
    this.router.navigate(['/update']);
  }

  isExpired() {
    return this.keyService.isExpired();
  }
}

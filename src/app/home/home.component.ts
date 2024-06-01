import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, RouterOutlet } from '@angular/router';
import { Song } from '../../models/Song';
import { SongServiceService } from '../../services/song-service.service';
import { CommonModule } from '@angular/common';
import { SongComponent } from '../song/song.component';
import { LyricsService } from '../../services/lyrics.service';
import { Lyrics } from '../../models/Lyrics';
import { SearchService } from '../../services/search.service';
import { DataBridgeService } from '../../services/data-bridge.service';
import { Author } from '../../models/Author';
import { Performer } from '../../models/Performer';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterOutlet, CommonModule, SongComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  songs!: Lyrics[];
  bannerText!: string;

  constructor(private songService: SongServiceService
    , private lyricsService: LyricsService
    , private route: ActivatedRoute
    , private searchService: SearchService
    , private dataService: DataBridgeService
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.chooseQuery(params);
    });
  }

  private chooseQuery(query: ParamMap) {
    switch (query.get('type')) {
      case 'genre':
        this.bannerText = 'Songs of genre ' + query.get('select');
        this.loadLyricsByGenre(query.get('select') ?? 'Rock')
        break;
      case 'author':
        this.bannerText = 'Songs of Author ' + query.get('select')
        this.loadLyricsByAuthor(this.dataService.getData());
        break;
      case 'performer':
        this.bannerText = 'Songs of Performer ' + query.get('select')
        this.loadLyricsByPerformer(this.dataService.getData());
        break;
      case 'search':
        this.bannerText = 'Results for '+(this.dataService.getData())
        this.searchForLyrics(this.dataService.getData());
        break  
      default:
        this.bannerText = 'Most popular songs'
        this.loadLyricsPopular();
        break;
    }
  }
  

  // private loadAllLyrics(): void {
  //   this.lyricsService.getAllLyrics().subscribe(data => this.songs = data);
  // }

  private loadLyricsPopular(): void {
    this.lyricsService.getLyricsFromAPICache().subscribe(data => this.songs = data);
  }

  private loadLyricsByGenre(genreName: String): void {
    this.searchService.searchByGenre(genreName).subscribe(data => this.songs = data );
  }

  private loadLyricsByAuthor(author: Author): void {
    this.searchService.searchByAuthor(author.firstName + ' ' + author.lastName).subscribe(data => this.songs = data);
  }

  private loadLyricsByPerformer(performer:Performer){
    this.searchService.searchByPerformer([performer.artistName,performer.firstName+' '+performer.lastName]).subscribe(data => this.songs = data);
  }

  private searchForLyrics(value:String){
    this.searchService.searchByLyrics(value).subscribe(data => this.songs = data);
  }
}

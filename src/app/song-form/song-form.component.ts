import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Genre } from '../../models/Genre';
import { Performer } from '../../models/Performer';
import { Author } from '../../models/Author';
import { AuthorService } from '../../services/author.service';
import { GenreService } from '../../services/genre.service';
import { PerformerService } from '../../services/performer.service';
import { SongServiceService } from '../../services/song-service.service';
import { Song } from '../../models/Song';
import { DataBridgeService } from '../../services/data-bridge.service';
import { ActivatedRoute, Router } from '@angular/router';
import { concatMap } from 'rxjs';


@Component({
  selector: 'app-song-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './song-form.component.html',
  styleUrl: './song-form.component.css'
})
export class SongFormComponent implements OnInit {
  songForm: FormGroup;
  genres!: Genre[];
  performers!: Performer[];
  authors!: Author[];

  constructor(private builder: FormBuilder
    , private authorService: AuthorService
    , private genreService: GenreService
    , private performerService: PerformerService
    , private songService: SongServiceService
    , private dataService: DataBridgeService
    , private router: Router
    , private change: ChangeDetectorRef
  ) {
    this.songForm = this.builder.group({
      name: ['', Validators.required],
      genre: [null, Validators.required],
      authorsArr: [[], Validators.required],
      performerArr: [[], Validators.required],
      lyrics: ['', Validators.required]
    });
  }


  ngOnInit(): void {
    this.loadFormData();
  }

  public isUpdating(){
    return this.router.url==='/update'
  }

  public onSubmit() {
    this.songService.uploadSong(this.packageSong()).subscribe(data => this.router.navigate(['']));
  }

  public updateSong(){
    this.songService.updateSong(this.packageSong()).subscribe(data=> this.router.navigate(['']));
  }

  public compareGenres(g1:Genre,g2:Genre){
    if(g1 && g2)
      return g1.name===g2.name;
    return false;
  }

  public compareAuthors(a1:Author,a2:Author){
    if(a1 && a2)
      return (a1.firstName===a2.firstName)&&(a1.lastName===a2.lastName);
    return false;
  }

  public comparePerformers(p1:Performer,p2:Performer){
    if(p1 && p2)
      return (p1.firstName===p2.firstName)&&(p1.lastName===p2.lastName)&&(p1.artistName===p2.artistName);
    return false;
  }

  private packageSong(): Song {
    const name = this.songForm.get('name')?.value
    const genre = this.songForm.get('genre')?.value
    const authorsArr = this.songForm.get('authorsArr')?.value
    const performerArr = this.songForm.get('performerArr')?.value
    const lyrics = this.songForm.get('lyrics')?.value
    let oldSong = null;

    if(this.isUpdating()){
      oldSong = this.dataService.getData() as Song;
    }

    const song = new Song(oldSong?.id, name, lyrics, oldSong?.lyricsID, genre, authorsArr, performerArr);

    return song;
  }

  private loadFormData() {

    this.genreService.getAllGenres().pipe(concatMap(genres => {
      this.genres = genres;
      return this.performerService.getAllPerformers();
    }), concatMap(performers => {
      this.performers = performers;
      return this.authorService.getAllAuthors();
    })).subscribe(authors => {
      this.authors = authors;

      if (this.router.url === '/update') {
        const song = this.dataService.getData() as Song;
        this.songForm.get('name')?.setValue(song.name);
        this.songForm.get('genre')?.setValue(song.genre);
        this.songForm.get('authorsArr')?.setValue(song.authors);
        this.songForm.get('performerArr')?.setValue(song.performers);
        this.songForm.get('lyrics')?.setValue(song.lyrics);
      }

    });

  }

  // private loadGenres(): void {
  //   this.genreService.getAllGenres().subscribe(data => this.genres = data)
  // }

  // private loadPerformers(): void {
  //   this.performerService.getAllPerformers().subscribe(data => this.performers = data)
  // }

  // private loadAuthors(): void {
  //   this.authorService.getAllAuthors().subscribe(data => this.authors = data)
  // }
}

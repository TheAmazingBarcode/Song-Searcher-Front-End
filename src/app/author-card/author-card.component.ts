import { Component, Input } from '@angular/core';
import { Author } from '../../models/Author';
import { RouterLink } from '@angular/router';
import { DataBridgeService } from '../../services/data-bridge.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-author-card',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './author-card.component.html',
  styleUrl: './author-card.component.css'
})
export class AuthorCardComponent {
  @Input() author!: Author;

  constructor(private dataService: DataBridgeService
    , private router: Router
  ) { }

  public navigate(): void {
    this.dataService.setData(this.author);
    this.router.navigate(['/songs/author/'+this.author.firstName+' '+this.author.lastName])
  }
}

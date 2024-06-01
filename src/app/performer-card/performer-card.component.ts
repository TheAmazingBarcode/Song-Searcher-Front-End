import { Component, Input } from '@angular/core';
import { Performer } from '../../models/Performer';
import { Router, RouterLink } from '@angular/router';
import { DataBridgeService } from '../../services/data-bridge.service';

@Component({
  selector: 'app-performer-card',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './performer-card.component.html',
  styleUrl: './performer-card.component.css'
})
export class PerformerCardComponent {
  @Input() performer!:Performer;

  constructor(private dataService: DataBridgeService
    , private router: Router
  ) { }

  public navigate(): void {
    this.dataService.setData(this.performer);
    this.router.navigate(['/songs/author/'+this.performer.artistName])
  }
}

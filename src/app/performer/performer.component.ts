import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PerformerService } from '../../services/performer.service';
import { PerformerCardComponent } from '../performer-card/performer-card.component';
import { Performer } from '../../models/Performer';


@Component({
  selector: 'app-performer',
  standalone: true,
  imports: [CommonModule, RouterOutlet, PerformerCardComponent],
  templateUrl: './performer.component.html',
  styleUrl: './performer.component.css'
})
export class PerformerComponent implements OnInit{
  performers!:Performer[]

  constructor(private performerService:PerformerService){}

  ngOnInit(): void {
    this.loadPerformers();
  }


  private loadPerformers():void{
    this.performerService.getAllPerformers().subscribe(data=> this.performers = data);
  }
}

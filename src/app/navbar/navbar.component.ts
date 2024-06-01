import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { RouterLink } from '@angular/router';
import { RouterLinkActive } from '@angular/router';
import { DataBridgeService } from '../../services/data-bridge.service';
import { ApiKeyService } from '../../services/api-key.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  constructor(private dataService: DataBridgeService,
    private router: Router,
    private keyService: ApiKeyService
  ) { }

  onSend(event: any): void {
    const value = event.target.value;

    this.dataService.setData(value);

    this.router.navigate(['/songs/search/' + value])
  }

  isExpired() {
    return this.keyService.isExpired()
  }

  logOut(){
    if(confirm('Do you wish to log out?'))
      this.keyService.deleteKey()
  }
}

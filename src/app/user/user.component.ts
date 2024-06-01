import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent {
  constructor(private router:Router){}

  public logIn(){this.router.navigate(['/user/login'])}

  public register(){this.router.navigate(['/user/register'])}
}

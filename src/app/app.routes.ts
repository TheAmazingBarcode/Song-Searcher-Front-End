import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { GenreComponent } from './genre/genre.component';
import { HomeComponent } from './home/home.component';
import { SongFormComponent } from './song-form/song-form.component';
import { AuthorComponent } from './author/author.component';
import { PerformerComponent } from './performer/performer.component';
import { SongDetailedComponent } from './song-detailed/song-detailed.component';
import { UserComponent } from './user/user.component';
import { UserLoginComponent } from './user-login/user-login.component';
import { UserRegisterComponent } from './user-register/user-register.component';

export const routes: Routes = [
    {path:'',component:HomeComponent},
    {path:'songs/:type/:select',component:HomeComponent},
    {path:'genre',component:GenreComponent},
    {path:'new',component:SongFormComponent},
    {path:'update',component:SongFormComponent},
    {path:'author',component:AuthorComponent},
    {path:'performer',component:PerformerComponent},
    {path:'detailed/song',component:SongDetailedComponent},
    {path:'user',component:UserComponent},
    {path:'user/login',component:UserLoginComponent},
    {path:'user/register',component:UserRegisterComponent}
];

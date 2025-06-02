import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home';
import { PlayerListComponent } from './components/player-list/player-list';
import { PlayerFormComponent } from './components/player-form/player-form';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'players', component: PlayerListComponent },
  { path: 'players/new', component: PlayerFormComponent },
  { path: 'players/edit/:id', component: PlayerFormComponent }
];

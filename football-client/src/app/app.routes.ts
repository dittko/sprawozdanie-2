import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home';
import { PlayerListComponent } from './components/player-list/player-list';
import { PlayerFormComponent } from './components/player-form/player-form';
import { RegisterFormComponent } from './components/register-form/register-form';
import { ForgotPasswordFormComponent } from './components/forgot-password-form/forgot-password-form';
import { ResetPasswordFormComponent } from './components/reset-password-form/reset-password-form';
import { LoginFormComponent } from './components/login-form/login-form';
import { TeamListComponent } from './components/team-list/team-list';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'players', component: PlayerListComponent },
  { path: 'players/new', component: PlayerFormComponent },
  {
    path: 'players/edit/:id',
    component: PlayerFormComponent,
    data: { render: { skip: true } }
  },
  { path: 'register', component: RegisterFormComponent },
  {
    path: 'activate/:token',
    redirectTo: '/',
    pathMatch: 'full',
    data: { render: { skip: true } }
  },
  { path: 'forgot-password', component: ForgotPasswordFormComponent },
  { path: 'reset-password', component: ResetPasswordFormComponent },
  { path: 'login', component: LoginFormComponent },
  { path: 'teams', component: TeamListComponent }
];


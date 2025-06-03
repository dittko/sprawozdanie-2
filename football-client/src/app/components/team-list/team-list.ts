import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-team-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './team-list.html',
  styleUrls: ['./team-list.css']
})
export class TeamListComponent implements OnInit {
  teams: any[] = [];
  error = '';
  newTeam = { name: '', country: '', league: '', founded: null };
  editTeamId: string | null = null;
  editTeamData = { name: '', country: '', league: '', founded: null };

  constructor(
    private http: HttpClient,
    public auth: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.fetchTeams();
  }

  fetchTeams(): void {
    this.http.get<any[]>('https://football-api-bdji.onrender.com/api/teams').subscribe({
      next: data => this.teams = data,
      error: err => this.error = err.error?.error || 'Błąd ładowania drużyn'
    });
  }

  addTeam(): void {
    this.http.post('https://football-api-bdji.onrender.com/api/teams', this.newTeam).subscribe({
      next: () => {
        this.fetchTeams();
        this.newTeam = { name: '', country: '', league: '', founded: null };
      },
      error: err => this.error = err.error?.error || 'Błąd dodawania drużyny'
    });
  }

  deleteTeam(id: string): void {
    this.http.delete(`https://football-api-bdji.onrender.com/api/teams/${id}`).subscribe({
      next: () => this.fetchTeams(),
      error: err => this.error = err.error?.error || 'Błąd usuwania drużyny'
    });
  }

  editTeam(team: any): void {
    this.editTeamId = team._id;
    this.editTeamData = { ...team };
  }

  cancelEdit(): void {
    this.editTeamId = null;
  }

  saveEdit(id: string): void {
    this.http.put(`https://football-api-bdji.onrender.com/api/teams/${id}`, this.editTeamData).subscribe({
      next: () => {
        this.fetchTeams();
        this.editTeamId = null;
      },
      error: err => this.error = err.error?.error || 'Błąd edycji drużyny'
    });
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/']);
  }
}

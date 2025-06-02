import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PlayerService, Player } from '../../services/player';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-player-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './player-list.html',
  styleUrls: ['./player-list.css']
})
export class PlayerListComponent implements OnInit {
  players: Player[] = [];

  constructor(private playerService: PlayerService, private router: Router) {}

  ngOnInit(): void {
    this.loadPlayers();
  }

  loadPlayers(): void {
    this.playerService.getAll().subscribe(data => this.players = data);
  }

  deletePlayer(id: string): void {
    this.playerService.delete(id).subscribe(() => {
      this.players = this.players.filter(p => p._id !== id);
    });
  }

  editPlayer(id: string): void {
    this.router.navigate(['/players/edit', id]);
  }
}

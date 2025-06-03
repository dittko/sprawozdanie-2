import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PlayerService, Player } from '../../services/player';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-player-form',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './player-form.html',
  styleUrls: ['./player-form.css']
})
export class PlayerFormComponent implements OnInit {
  player: Player = {
    name: '',
    position: 'pomocnik',
    number: 0,
    club: '',
    nationality: '',
    age: 18
  };

  isEditMode = false;
  playerId: string | null = null;

  constructor(private route: ActivatedRoute, private router: Router, private playerService: PlayerService) {}

  ngOnInit(): void {
    this.playerId = this.route.snapshot.paramMap.get('id');
    if (this.playerId) {
      this.isEditMode = true;
      this.playerService.getById(this.playerId).subscribe(p => this.player = p);
    }
  }

  onSubmit(): void {
    if (this.isEditMode && this.playerId) {
      this.playerService.update(this.playerId, this.player).subscribe(() => this.router.navigate(['/players']));
    } else {
      this.playerService.create(this.player).subscribe(() => this.router.navigate(['/players']));
    }
  }
}

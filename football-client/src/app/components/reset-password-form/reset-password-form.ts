import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-reset-password-form',
  standalone: true,
  imports: [CommonModule, FormsModule,HttpClientModule],
  templateUrl: './reset-password-form.html',
  styleUrls: ['./reset-password-form.css']
})
export class ResetPasswordFormComponent {
  newPassword = '';
  repeatPassword = '';
  message = '';
  token: string = '';

  constructor(private route: ActivatedRoute, private http: HttpClient, private router: Router) {
    this.token = this.route.snapshot.queryParamMap.get('token') || '';
  }

  onSubmit(): void {
    this.http.post(`https://football-api-bdji.onrender.com/api/auth/reset-password/${this.token}`, {
      newPassword: this.newPassword,
      repeatPassword: this.repeatPassword
    }).subscribe({
      next: () => this.message = 'Hasło zmienione. Możesz się zalogować.',
      error: () => this.message = 'Błąd zmiany hasła.'
    });
  }
}

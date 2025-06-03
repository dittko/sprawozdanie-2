import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-forgot-password-form',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule], 
  templateUrl: './forgot-password-form.html',
  styleUrls: ['./forgot-password-form.css']
})
export class ForgotPasswordFormComponent {
  email = '';
  message = '';

  constructor(private http: HttpClient) {}

  onSubmit(): void {
    this.http.post('http://localhost:5000/api/auth/forgot-password', {
      email: this.email
    }).subscribe({
      next: () => this.message = 'Wysłano link do zmiany hasła na e-mail.',
      error: () => this.message = 'Błąd wysyłania wiadomości.'
    });
  }
}

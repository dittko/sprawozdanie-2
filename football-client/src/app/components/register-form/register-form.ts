import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-register-form',
  standalone: true,
  imports: [CommonModule, FormsModule,HttpClientModule],
  templateUrl: './register-form.html',
  styleUrls: ['./register-form.css']
})
export class RegisterFormComponent {
  email = '';
  password = '';
  message = '';

  constructor(private http: HttpClient, private router: Router) {}

  onRegister(): void {
this.http.post('https://football-api-bdji.onrender.com/api/auth/register', {
      email: this.email,
      password: this.password
    }).subscribe({
      next: () => {
        this.message = 'Rejestracja zakończona. Sprawdź e-mail i aktywuj konto.';
        this.email = '';
        this.password = '';
      },
      error: (err) => {
        this.message = err.error?.error || 'Wystąpił błąd rejestracji.';
      }
    });
  }
}

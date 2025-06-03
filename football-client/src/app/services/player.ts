import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Player {
  _id?: string;
  name: string;
  position: 'bramkarz' | 'obrońca' | 'pomocnik' | 'napastnik';
  number: number;
  club: string;
  nationality: string;
  age: number;
}

@Injectable({ providedIn: 'root' })
export class PlayerService {
  private apiUrl = 'https://football-api-bdji.onrender.com/api/players';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Player[]> {
    return this.http.get<Player[]>(this.apiUrl);
  }

  getById(id: string): Observable<Player> {
    return this.http.get<Player>(`${this.apiUrl}/${id}`);
  }

  create(player: Player): Observable<Player> {
    return this.http.post<Player>(this.apiUrl, player);
  }

  update(id: string, player: Player): Observable<Player> {
    return this.http.put<Player>(`${this.apiUrl}/${id}`, player);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}

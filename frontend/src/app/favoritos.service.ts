import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FavoritosService {
  private apiUrl = 'http://localhost:4200/api/favoritos'; // URL do seu backend

  constructor(private http: HttpClient) {}

  // Método para obter os favoritos de um usuário
  getFavoritos(usuarioId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/${usuarioId}`);
  }

  // Método para adicionar um livro aos favoritos
  adicionarFavorito(usuarioId: string, livroId: string): Observable<any> {
    return this.http.post<any>(this.apiUrl, { usuarioId, livroId });
  }
}


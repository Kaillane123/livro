import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LivroService {
  private apiUrl = 'https://www.googleapis.com/books/v1/volumes'; // URL da API de livros

  constructor(private http: HttpClient) {}

  buscarLivros(termo: string): Observable<any> {
    const url = `${this.apiUrl}?q=${termo}`;  // Constroi a URL com o parâmetro de pesquisa
    return this.http.get<any>(url);// Realiza uma requisição GET e retorna um Observable com a resposta da API
  }
  
}

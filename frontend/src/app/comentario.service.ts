import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ComentarioService {

  private apiUrl = `${window.location.origin}/api/comentarios`; // URL do seu backend

  constructor(private http: HttpClient) {}

  listarComentarios(livroCod: string) {
    return this.http.get(`${this.apiUrl}/${livroCod}`);
  }

  adicionarComentario(comentario: { text: string, livroCod: string }): Observable<any> {   // Faz uma requisição POST para enviar um novo comentário ao backend
    return this.http.post(this.apiUrl, comentario);
  }
}

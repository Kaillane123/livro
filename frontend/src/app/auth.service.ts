import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // URL base para a API de autenticação
  private apiUrl = 'http://localhost:4200/api';

  //injeção de dependências
  constructor(
    private http: HttpClient,
    private router: Router
  ) {}
  
 // Faz uma requisição POST para a API de login
  login(email: string, senha: string) {
    return this.http.post(`${this.apiUrl}/login`, { email, senha });
  }

  async cadastro(email: string, senha: string) {
    await this.http.post(`${this.apiUrl}/cadastro`, { email, senha }).toPromise();
    this.router.navigate(["/"])
  }
}

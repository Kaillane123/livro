import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  clienteForm = new FormGroup({
    email: new FormControl(''),
    senha: new FormControl(''),
  });

  constructor(private router: Router, private authService: AuthService) {}

  enviar(): void {
    const { email, senha } = this.clienteForm.value;

    this.authService.login(email!, senha!).subscribe({
      next: () => {
        
         // redireciona para a rota de busca
        this.router.navigate(['/busca']); 
      },
      error: (err) => {
        alert(err.error.message || 'Erro ao fazer login');
      },
    });
  }
}

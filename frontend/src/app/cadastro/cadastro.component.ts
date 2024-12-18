import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrl: './cadastro.component.css',
  standalone: false
})
export class CadastroComponent {
  clienteForm = new FormGroup({
    email: new FormControl(''),
    senha: new FormControl('')
  })

  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  async cadastrar(): Promise<void> { 
    const { email, senha } = this.clienteForm.value

    await this.authService.cadastro(email!, senha!)
    alert('Cadastro realizado com sucesso!');
  }

  busca(): void {
    this.router.navigate(['/busca']);
  }
}


import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'], 
  standalone: false
})
export class LoginComponent {
  clienteForm = new FormGroup({
    email: new FormControl(''),
    senha: new FormControl('')
  }); 

  constructor(private router: Router) {

  }

  enviar(): void { 
    const {email, senha} = this.clienteForm.value; 
    
/*
    if (senha == '1234') {
      this.router.navigate(['/cadastro'])
      */
    }

  
  registro(): void {
    this.router.navigate(['/cadastro']);
  }

  ngOnInit(): void {
    const button = document.getElementById('btnRegistro');
    if (button) {
      button.onclick = () => this.registro(); // Vai para a página "cadastro" ao clicar no botão
    }
  }

    
  }

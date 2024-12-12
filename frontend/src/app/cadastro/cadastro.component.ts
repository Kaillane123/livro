import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

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
  constructor(private router: Router) {

  }
  cadastrar(): void { 
    console.log(this.clienteForm.value); 
  }
  busca(): void {
    this.router.navigate(['/busca']);
  }

  ngOnInit(): void {
    const button = document.getElementById('btnBusca');
    if (button) {
      button.onclick = () => this.busca(); // Vai para a página "cadastro" ao clicar no botão
    }
  }
 
  }


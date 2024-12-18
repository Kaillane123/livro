import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router'; 
import { ComentarioService } from '../comentario.service'; 

interface Comentario {
  text: string
  createdAt: Date
}

@Component({
  selector: 'app-comentario',
  templateUrl: './comentario.component.html',
  styleUrls: ['./comentario.component.css'] 
})
export class ComentarioComponent implements OnInit {
  livroCod: string | null = null
  clienteForm = new FormGroup({
    text: new FormControl('', [Validators.required, Validators.minLength(1)]) // Adicionado validador
  });
  comentarios: Comentario[] = []

  constructor(  
    private router: Router,
    private route: ActivatedRoute,
    private ComentarioService: ComentarioService 
  ) {}

  ngOnInit() {
     // Obtém o código do livro da rota
    this.route.paramMap.subscribe((params) => {
      this.livroCod = params.get('id')!
      // Chama o serviço para listar comentários do livro 
      this.ComentarioService.listarComentarios(this.livroCod!).subscribe({
        next: (response) => {
          this.comentarios = response as Comentario[]
        }
      })
    });
  }

  enviar(): void {
    if (this.clienteForm.invalid) {
      alert('O comentário não pode estar vazio!');
      return;
    }

    const { text } = this.clienteForm.value;

     // Chama o serviço para adicionar o comentário
    this.ComentarioService.adicionarComentario({ text: text!, livroCod: this.livroCod! }).subscribe({
      next: (response) => {
        alert('Comentário enviado com sucesso!');
        this.clienteForm.reset(); // Limpa o formulário após o envio
      },
      error: (err) => {
        console.error('Erro ao enviar comentário:', err);
        alert('Ocorreu um erro ao enviar o comentário. Tente novamente.');
      }
    });
  }
}
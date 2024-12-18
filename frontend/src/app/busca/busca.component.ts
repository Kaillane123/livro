import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LivroService } from '../livro.service';
import { Livro } from '../livro';
import { Router } from '@angular/router';

@Component({
  selector: 'app-busca',
  templateUrl: './busca.component.html',
  styleUrls: ['./busca.component.css'] 
})
export class BuscaComponent {
  formBusca: FormGroup;
  livros: Livro[]; 

  constructor(private fb: FormBuilder, private livroService: LivroService, private router: Router) {
    this.formBusca = this.fb.group({
      termo: ['', [Validators.required, Validators.minLength(2)]]
    });

    this.livros = [];
  }
  comentario = () => {
    this.router.navigate(['/comentario']);
  }
 

  buscar(): void {
    const termo = this.formBusca.value.termo; 
    this.livroService.buscarLivros(termo).subscribe(
      (res) => {
        // Mapeia a resposta da API para o modelo de Livro
        this.livros = res.items.map((item: any) => ({
          Cod: item.id,
          Titulo: item.volumeInfo.title,
          Autor: item.volumeInfo.authors,
          Descri: item.volumeInfo.description,
          Imagem: item.volumeInfo.imageLinks?.thumbnail
        }));
      },
      (err) => {
        console.error('Erro ao buscar livros:', err);
      }
    );
  }
}

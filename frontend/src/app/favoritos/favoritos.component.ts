import { Component, OnInit } from '@angular/core';
import { FavoritosService } from '../favoritos.service';

@Component({
  selector: 'app-favoritos',
  templateUrl: './favoritos.component.html',
  styleUrls: ['./favoritos.component.css']
})
export class FavoritosComponent implements OnInit {
  favoritos: any[] = [];
  usuarioId: string = '12345'; // Isso pode vir do sistema de autenticação

  constructor(private favoritosService: FavoritosService) {}

  ngOnInit(): void {
    this.carregarFavoritos();
  }

  // Carregar a lista de favoritos
  carregarFavoritos(): void {
    this.favoritosService.getFavoritos(this.usuarioId).subscribe(
      (dados) => {
        this.favoritos = dados;
      },
      (erro) => {
        console.error('Erro ao carregar favoritos', erro);
      }
    );
  }

  // Adicionar livro aos favoritos
  adicionarFavorito(livroId: string): void {
    this.favoritosService.adicionarFavorito(this.usuarioId, livroId).subscribe(
      (resposta) => {
        console.log('Livro adicionado aos favoritos');
        this.carregarFavoritos(); // Recarregar a lista de favoritos
      },
      (erro) => {
        console.error('Erro ao adicionar aos favoritos', erro);
      }
    );
  }
}

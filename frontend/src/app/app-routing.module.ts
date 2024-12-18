import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BuscaComponent } from './busca/busca.component';
import { CadastroComponent } from './cadastro/cadastro.component';
import { ComentarioComponent } from './comentario/comentario.component';
import { FavoritosComponent } from './favoritos/favoritos.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path:'busca', component: BuscaComponent},
  {path: 'cadastro', component: CadastroComponent},
  {path: 'favoritos', component: FavoritosComponent},

  {path: 'livros/:id/comentarios', component: ComentarioComponent},


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

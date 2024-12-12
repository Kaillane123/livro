import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BuscaComponent } from './busca/busca.component';
import { CadastroComponent } from './cadastro/cadastro.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'cadastro', component: CadastroComponent},
  {path: '', redirectTo: 'login', pathMatch: 'full'},

  {path: 'cadastro', component: CadastroComponent},
  {path:'busca', component: BuscaComponent},
  {path: '', redirectTo: 'cadastro', pathMatch: 'full'},

  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-busca',
  templateUrl: './busca.component.html',
  styleUrl: './busca.component.css'
})
export class BuscaComponent {
  /*
  formBusca: FormGroup
  //filme: Filme | undefined 
  filmes: Filme[]
  constructor(private fb: FormBuilder, 
              private fs: FilmeService
  ) {
    this.formBusca = this.fb.group({
      titulo: ['', [Validators.required, 
                    Validators.minLength(2)]
              ]
    })

    this.filmes = []
  }
  buscar() {
    const titulo = this.formBusca.value.titulo
    this.fs.buscarFilmesPorTitulo(titulo).subscribe(
      res => {
        this.filmes = res.Search
      }
    )

}
*/
}

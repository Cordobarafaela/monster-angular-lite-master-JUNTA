import { Component, OnInit } from '@angular/core';
import { Titulo } from '../interfaces/titulo';
import { TituloService } from '../services/titulo.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-titulo',
  templateUrl: './titulo.component.html',
  styleUrls: ['./titulo.component.scss']
})
export class TituloComponent implements OnInit {

  titulos: Titulo[] = [];

  constructor(private tituloService: TituloService) { }

  ngOnInit(): void {
    this.tituloService.getTitulo()
      .subscribe(titulos => this.titulos = titulos);
  }

  borrarTitulo(titulo:Titulo,i:any) {

    Swal.fire({
      title: '¿Esta seguro?',
      text: `Esta seguro que desea borrar a ${titulo.nombre}`,
      icon: 'question',
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
      showConfirmButton: true,
      showCancelButton: true,
    }).then ( resp=> {  
      if (resp.value) {
        this.tituloService.borrarTitulo(i).subscribe(resp=>{
          this.tituloService.getTitulo().subscribe(titulos=> this.titulos=titulos);
           })
      }
    })
  }

}

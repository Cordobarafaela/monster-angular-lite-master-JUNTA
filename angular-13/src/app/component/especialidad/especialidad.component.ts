import { Component, OnInit } from '@angular/core';
import { Especialidad } from '../interfaces/especialidad';
import { EspecialidadService } from '../services/especialidad.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-especialidad',
  templateUrl: './especialidad.component.html',
  styleUrls: ['./especialidad.component.scss']
})

export class EspecialidadComponent implements OnInit {

  especialidades: Especialidad[] = [];
  constructor(private especialidadService: EspecialidadService) { }

  ngOnInit(): void {
    this.especialidadService.getEspecialidad()
      .subscribe(especialidades => this.especialidades = especialidades);
  }


  borrarEspecialidad(especialidad: Especialidad, i: any) {

    Swal.fire({
      title: '¿Esta seguro?',
      text: `Esta seguro que desea borrar a ${especialidad.nombre}`,
      icon: 'question',
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
      showConfirmButton: true,
      showCancelButton: true,
    }).then(resp => {
      if (resp.value) {
        this.especialidadService.borrarEspecialidad(i).subscribe(resp => {
          this.especialidadService.getEspecialidad().subscribe(especialidades => this.especialidades = especialidades);
        })
      }
    })

  }


}

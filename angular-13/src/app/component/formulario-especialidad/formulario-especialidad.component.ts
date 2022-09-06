import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Especialidad } from '../interfaces/especialidad';
import { EspecialidadService } from '../services/especialidad.service';
import { switchMap } from 'rxjs/operators';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-formulario-especialidad',
  templateUrl: './formulario-especialidad.component.html',
  styleUrls: ['./formulario-especialidad.component.scss']
})
export class FormularioEspecialidadComponent implements OnInit {

  especialidad: Especialidad = {
    nombre: '',
    nivel: '',
    descripcion: '',
    estado: false,
  }

  constructor(private especialidadService: EspecialidadService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder) { }

  miFormulario: FormGroup = this.fb.group({
    nombre: [, [Validators.required, Validators.minLength(3)]],
    nivel: [, [Validators.required]],
    descripcion: [, [Validators.required, Validators.minLength(3), Validators.maxLength(10)]],
  })

  /*     campoEsValido(campo:string){
                  return this.miFormulario.controls[campo].errors 
                         && this.miFormulario.controls[campo].touched 
      }
   */
  ngOnInit(): void {
    if (!this.router.url.includes('editar')) {
      return;
    }
    this.activatedRoute.params
      .pipe(
        switchMap(({ id }) => this.especialidadService.getEspecialidadporId(id))
      )
      .subscribe(especialidad => this.especialidad = especialidad);
  }

  guardar() {
    if (this.miFormulario.invalid) {
      this.miFormulario.markAllAsTouched();
      return;
    }
    Swal.fire({
      title: 'Espere',
      text: 'Guardando informacion',
      icon: 'info',
      allowOutsideClick: false
    });
    if (this.especialidad.id)
    //actualizar
    {
      this.especialidadService.actualizarEspecialidad(this.especialidad)
        .subscribe(especialidad => {
          Swal.fire({
            title: this.especialidad.nombre,
            text: 'Se actualizo correctamente',
            icon: 'success',
          });
        });
    }
    else {
      //crear
      this.especialidadService.agregarEspecialidad(this.especialidad).subscribe(especialidad => {
        this.router.navigate(['especialidades/editar', especialidad.id]);
        Swal.fire({
          title: this.especialidad.nombre,
          text: 'Se creo correctamente',
          icon: 'success',
        });
        this.router.navigate(['/component/especialidades'])

        this.miFormulario.reset({
          nombre: '',
          resolucion: '',
          nroTitulo: null,
          nivel: '',
          descripcion: '',
          horas: null,
        })
      })
    }
  }
}
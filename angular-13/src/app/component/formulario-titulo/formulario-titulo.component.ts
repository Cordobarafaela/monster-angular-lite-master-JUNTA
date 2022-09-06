import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Titulo } from '../interfaces/titulo';
import { switchMap } from 'rxjs/operators';
import { TituloService } from '../services/titulo.service';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-formulario-titulo',
  templateUrl: './formulario-titulo.component.html',
  styleUrls: ['./formulario-titulo.component.scss']
})
export class FormularioTituloComponent implements OnInit {

  titulo: Titulo = {
    nombre: '',
    resolucion: '',
    nroTitulo: null,
    nivel: '',
    descripcion: '',
    horas: null,
  }

  constructor(private activatedRoute: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private tituloService: TituloService) { }

  miFormulario: FormGroup = this.fb.group({
    nombre: [, [Validators.required, Validators.minLength(3)]],
    resolucion: [, [Validators.required, Validators.minLength(4)]],
    nroTitulo: [, [Validators.required, Validators.min(0)]],
    nivel: [, [Validators.required]],
    descripcion: [, [Validators.required, Validators.minLength(3), Validators.maxLength(10)]],
    horas: [, [Validators.required, Validators.min(0)]],
  })


  ngOnInit(): void {
    if (!this.router.url.includes('editar')) {
      return;
    }
    this.activatedRoute.params
      .pipe(
        switchMap(({ id }) => this.tituloService.getTituloporId(id))
      )
      .subscribe(titulo => this.titulo = titulo);

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


    if (this.titulo.id)
    //actualizar
    {
      this.tituloService.actualizarTitulo(this.titulo)
        .subscribe(titulo => {
          Swal.fire({
            title: this.titulo.nombre,
            text: 'Se actualizo correctamente',
            icon: 'success',
          });
        });
    }
    else {
      //crear
      this.tituloService.agregarTitulo(this.titulo).subscribe(titulo => {
        this.router.navigate(['titulos/editar', titulo.id]);
        Swal.fire({
          title: this.titulo.nombre,
          text: 'Se creo correctamente',
          icon: 'success',
        });


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

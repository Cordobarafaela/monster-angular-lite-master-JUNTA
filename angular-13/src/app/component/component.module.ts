import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ComponentsRoutes } from './component.routing';
import { TituloComponent } from './titulo/titulo.component';
import { EspecialidadComponent } from './especialidad/especialidad.component';
import { FormularioTituloComponent } from './formulario-titulo/formulario-titulo.component';
import { FormularioEspecialidadComponent } from './formulario-especialidad/formulario-especialidad.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(ComponentsRoutes),
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
  ],
  declarations: [
    TituloComponent,
    EspecialidadComponent,   
    FormularioTituloComponent,
    FormularioEspecialidadComponent
  ]
})
export class ComponentsModule { }

import { Routes } from '@angular/router';
import { TituloComponent } from './titulo/titulo.component';
import { FormularioTituloComponent } from './formulario-titulo/formulario-titulo.component';
import { FormularioEspecialidadComponent } from './formulario-especialidad/formulario-especialidad.component';
import { EspecialidadComponent } from './especialidad/especialidad.component';


export const ComponentsRoutes: Routes = [
	{
		path: '',
		children: [
			
			{
				path: 'titulos',
				component: TituloComponent
			},
			{
				path: 'especialidades',
				component: EspecialidadComponent,
			},
			{
				path: 'formulario-Titulo',
				component: FormularioTituloComponent
			},
			{
				path: 'formulario-Especialidad',
				component: FormularioEspecialidadComponent
			},
		]
	}
];

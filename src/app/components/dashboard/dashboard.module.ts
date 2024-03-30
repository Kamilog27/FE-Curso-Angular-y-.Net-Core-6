import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { CambiarPasswordComponent } from './cambiar-password/cambiar-password.component';


import { PasoUnoComponent } from './cuestionarios/nuevo-cuestionario/paso-uno/paso-uno.component';
import { PasoDosComponent } from './cuestionarios/nuevo-cuestionario/paso-dos/paso-dos.component';
import { NuevaPreguntaComponent } from './cuestionarios/nuevo-cuestionario/paso-dos/nueva-pregunta/nueva-pregunta.component';
import { EstadisticasComponent } from './cuestionarios/estadisticas/estadisticas.component';
import { DetalleRespuestaComponent } from './cuestionarios/estadisticas/detalle-respuesta/detalle-respuesta.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { NuevoCuestionarioComponent } from './cuestionarios/nuevo-cuestionario/nuevo-cuestionario.component';
import { CuestionarioComponent } from './cuestionarios/cuestionario/cuestionario.component';
import { CuestionariosComponent } from './cuestionarios/cuestionarios.component';


@NgModule({
  declarations: [
    CambiarPasswordComponent,
    PasoUnoComponent,
    PasoDosComponent,
    NuevaPreguntaComponent,
    NuevoCuestionarioComponent,
    CuestionarioComponent,
    CuestionariosComponent,
    EstadisticasComponent,
    DetalleRespuestaComponent,
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedModule,
  ],

})
export class DashboardModule { }

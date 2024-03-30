import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RespuestaCuestionarioService } from 'src/app/services/respuesta-cuestionario.service';

@Component({
  selector: 'app-ingresar-nombre',
  templateUrl: './ingresar-nombre.component.html',
  styleUrls: ['./ingresar-nombre.component.css']
})
export class IngresarNombreComponent {
  nombreParticipante='';
  constructor(private router:Router,private respuestaCuestionarioService:RespuestaCuestionarioService){
   
    if(this.respuestaCuestionarioService.idCuestionario==null){
      this.router.navigate(['/inicio']);
      return;
    }
  }
  siguiente(){
    this.respuestaCuestionarioService.nombreParticipante=this.nombreParticipante;
    this.router.navigate(['/inicio/listCuestionarios/pregunta']);
  }
}

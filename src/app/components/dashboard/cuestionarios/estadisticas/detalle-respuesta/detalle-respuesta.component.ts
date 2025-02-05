import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Cuestionario } from 'src/app/models/cuestionario';
import { RespuestaCuestionarioDetalle } from 'src/app/models/respuestaCuestionarioDetalle';
import { RespuestaCuestionarioService } from 'src/app/services/respuesta-cuestionario.service';

@Component({
  selector: 'app-detalle-respuesta',
  templateUrl: './detalle-respuesta.component.html',
  styleUrls: ['./detalle-respuesta.component.css']
})
export class DetalleRespuestaComponent implements OnInit{
  idRespuesta!:number;
  loading=false;
  cuestionario!:Cuestionario;
  respuestas:RespuestaCuestionarioDetalle[]=[];

  constructor(private activatedRouted:ActivatedRoute,
    private respuestaCuestionarioService:RespuestaCuestionarioService){
      this.idRespuesta=+this.activatedRouted.snapshot.paramMap.get('id')!;
  }
  ngOnInit(): void {
    this.getListRespuestasYCuestionario();
  }

  getListRespuestasYCuestionario(){
    this.loading==true;
    this.respuestaCuestionarioService.getCuestionarioByIdRespuesta(this.idRespuesta).subscribe(data=>{
      
      this.cuestionario=data.cuestionario;
      this.respuestas=data.respuestas;
      
      this.loading==false;
    })
  }
}

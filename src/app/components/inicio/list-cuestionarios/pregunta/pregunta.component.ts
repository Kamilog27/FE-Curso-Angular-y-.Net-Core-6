import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Pregunta } from 'src/app/models/pregunta';
import { RespuestaCuestionario } from 'src/app/models/respuestaCuestionario';
import { RespuestaCuestionarioDetalle } from 'src/app/models/respuestaCuestionarioDetalle';
import { CuestionarioService } from 'src/app/services/cuestionario.service';
import { RespuestaCuestionarioService } from 'src/app/services/respuesta-cuestionario.service';

@Component({
  selector: 'app-pregunta',
  templateUrl: './pregunta.component.html',
  styleUrls: ['./pregunta.component.css']
})
export class PreguntaComponent implements OnInit {
  idCuestionario!: number;
  listPreguntas: Pregunta[] = [];
  loading = false;
  rtaConfirmada: boolean = false;
  opcionSeleccionada: any;
  index=0;
  idRespuestaSeleccionada!:number|null;
  listRespuestaDetalle:RespuestaCuestionarioDetalle[]=[];
  constructor(private respuestCuestionarioService: RespuestaCuestionarioService,
    private cuestionarioService: CuestionarioService,
    private router: Router) {

  }
  ngOnInit(): void {

    this.idCuestionario = this.respuestCuestionarioService.idCuestionario;

    if (this.idCuestionario == null) {
      this.router.navigate(['/inicio']);
      return;
    }
    this.getCuestionario();
    this.respuestCuestionarioService.respuestas=[];

  }
  getCuestionario() {
    this.loading = true;
    this.cuestionarioService.getCuestionario(this.idCuestionario).subscribe(data => {
      this.loading = false;
      this.listPreguntas = data.listPreguntas;
      this.respuestCuestionarioService.cuestionario=data;
    })
  }
  obtenerPregunta(): string {
    
    return this.listPreguntas[this.index].descripcion;
  }
  getIndex(): number {
    return this.index;
  }
  respuestaSeleccionada(respuesta: any,respuestaId:any): void {
    
    this.opcionSeleccionada = respuesta;
    this.rtaConfirmada=true;
    this.idRespuestaSeleccionada=respuestaId;
  }
  AddClassOption(respuesta: any): string {
    if (respuesta === this.opcionSeleccionada) {
      return 'active text-light';
    }
    return '';
  }
  siguiente(){
    this.respuestCuestionarioService.respuestas.push(this.idRespuestaSeleccionada!);

    const detalleRespuesta:RespuestaCuestionarioDetalle={
      respuestaId:this.idRespuestaSeleccionada!
    };
    this.listRespuestaDetalle.push(detalleRespuesta)
    console.log(this.respuestCuestionarioService.respuestas)
    this.rtaConfirmada=false;
    this.index++;
    this.idRespuestaSeleccionada=null;
    if(this.index==this.listPreguntas.length){
      // this.router.navigate(['/inicio/respuestaCuestionario']);
      this.index--;  
      this.guardarRespuestaCuestionario();
    }
   
  }
  guardarRespuestaCuestionario(){
    const rtaCuestionario:RespuestaCuestionario={
      CuestionarioId:this.respuestCuestionarioService.idCuestionario,
      nombreParticipante:this.respuestCuestionarioService.nombreParticipante,
      listRtaCuestionarioDetalle:this.listRespuestaDetalle

    };
    console.log(rtaCuestionario);
    this.loading=true;
    this.respuestCuestionarioService.guardarRespuestaCuestionario(rtaCuestionario).subscribe(data=>{
      this.loading=false;
      this.router.navigate(['/inicio/listCuestionarios/respuestaCuestionario']);
    },error=>{
      this.loading=false;
      console.log(error);
    })
  }
}

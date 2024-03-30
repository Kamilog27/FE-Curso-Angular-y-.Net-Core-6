import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Pregunta } from 'src/app/models/pregunta';
import { Respuesta } from 'src/app/models/respuesta';

@Component({
  selector: 'app-nueva-pregunta',
  templateUrl: './nueva-pregunta.component.html',
  styleUrls: ['./nueva-pregunta.component.css']
})
export class NuevaPreguntaComponent implements OnInit{
  nuevaPregunta:FormGroup=this.fb.group({
    titulo:['',Validators.required],
    respuestas:this.fb.array([])  
  })
  pregunta!:Pregunta;
  rtaCorrecta=0;
  @Output()
  enviarPregunta=new EventEmitter<Pregunta>();

  constructor(private fb:FormBuilder,private toastr:ToastrService,private router:Router){}
  ngOnInit(): void {
    this.agregarRespuesta();
    this.agregarRespuesta();
  }

  get getRespuestas():FormArray{
    return this.nuevaPregunta.get('respuestas') as FormArray;
  }

  agregarRespuesta(){
    this.getRespuestas.push(this.fb.group({
      descripcion:['',Validators.required],
      esCorrecta:[0],
    }))
  }

  eliminarRespuesta(i:number){
    if(this.getRespuestas.length==2){
      
      this.toastr.error('No se puede eliminar minimo debe haber dos respuestas','Error',{
        timeOut: 3000,
        positionClass: 'toast-top-left',
        closeButton:true
      });
    }else{
      this.getRespuestas.removeAt(i);
    }
  }
  setRespuestaValida(i:number){
    this.rtaCorrecta=i;
  }
  agregarPregunta(){
    const descripcionPregunta=this.nuevaPregunta.value.titulo;
    const arrayRespuestas=this.nuevaPregunta.value.respuestas;

    const arrayRta:Respuesta[]=[];

    arrayRespuestas.forEach((element:any,i:number)=>{
      const respuesta:Respuesta=new Respuesta(element.descripcion,false);
      if(i===this.rtaCorrecta){
        respuesta.esCorrecta=true;
        
      }
      arrayRta.push(respuesta);
      
    })
    const pregunta=new Pregunta(descripcionPregunta,arrayRta);
    this.enviarPregunta.emit(pregunta);
    this.reset()
  }
  reset(){
    this.rtaCorrecta=0;
    this.nuevaPregunta.reset();
    this.getRespuestas.clear();
    this.agregarRespuesta();
    this.agregarRespuesta();
  }
}

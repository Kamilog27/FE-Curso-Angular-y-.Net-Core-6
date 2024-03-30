import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {  ToastrService } from 'ngx-toastr';
import { Cuestionario } from 'src/app/models/cuestionario';
import { Pregunta } from 'src/app/models/pregunta';
import { CuestionarioService } from 'src/app/services/cuestionario.service';

@Component({
  selector: 'app-paso-dos',
  templateUrl: './paso-dos.component.html',
  styleUrls: ['./paso-dos.component.css']
})
export class PasoDosComponent implements OnInit{
  tituloCuestionario:string='';
  descripcionCuestionario:string='';
  listPreguntas:Pregunta[]=[];
  loading=false;
  
  constructor(private cuestionarioService:CuestionarioService,private toastr:ToastrService,private router:Router){}
  ngOnInit(): void {
    this.tituloCuestionario=this.cuestionarioService.tituloCuestionario;
    this.descripcionCuestionario=this.cuestionarioService.descripcionCuestionario;
  }

  guardarPregunta(pregunta:Pregunta){
    this.listPreguntas.push(pregunta);
    
  }
  eliminarPregunta(i:number){
    this.listPreguntas.splice(i,1);
  }


  guardarCuestionario(){
    const cuestionario:Cuestionario={
      nombre:this.tituloCuestionario,
      descripcion:this.descripcionCuestionario,
      listPreguntas:this.listPreguntas
    };
    this.loading=true;
    this.cuestionarioService.guardarCuestionario(cuestionario).subscribe(data=>{
      this.toastr.success('El cuestionario fue registrado con éxito','Cuestionario Registrado');
      this.router.navigateByUrl('/dashboard');
      this.loading=false;
    },error=>{
      
      this.toastr.error('Opps ocurrio un error','Error');
      this.router.navigateByUrl('/dashboard');
      this.loading=false;
    })
  }
}

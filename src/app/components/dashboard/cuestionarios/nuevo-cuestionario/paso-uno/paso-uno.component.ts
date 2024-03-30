import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CuestionarioService } from 'src/app/services/cuestionario.service';

@Component({
  selector: 'app-paso-uno',
  templateUrl: './paso-uno.component.html',
  styleUrls: ['./paso-uno.component.css']
})
export class PasoUnoComponent {
  datosCuestionario:FormGroup=this.fb.group({
    titulo:['',Validators.required],
    descripcion:['',Validators.required]
  })

  constructor(private fb:FormBuilder,private cuestionarioService:CuestionarioService,private router:Router){}

  pasoUno(){
    this.cuestionarioService.tituloCuestionario=this.datosCuestionario.value.titulo;
    this.cuestionarioService.descripcionCuestionario=this.datosCuestionario.value.descripcion;
    this.router.navigateByUrl('/dashboard/nuevoCuestionario/pasoDos');
  }
}

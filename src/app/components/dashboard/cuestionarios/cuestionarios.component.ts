import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Cuestionario } from 'src/app/models/cuestionario';
import { CuestionarioService } from 'src/app/services/cuestionario.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-cuestionarios',
  templateUrl: './cuestionarios.component.html',
  styleUrls: ['./cuestionarios.component.css']
})
export class CuestionariosComponent implements OnInit{
  nombreUsuario:string|null='';
  listCuestionarios:Cuestionario[]=[];
  loading=false;
  constructor(private loginService:LoginService,private cuestionarioService:CuestionarioService,private toastr:ToastrService){

  }
  ngOnInit(): void {
    this.getTokenDecoded();
    this.getCuestionarios();
  }
  getTokenDecoded(){
    this.nombreUsuario=this.loginService.getTokenDecoded().sub;
  }
  getCuestionarios(){
    this.loading=true;
    this.cuestionarioService.getListCuestionarioByUser().subscribe(data=>{
      console.log(data);
      this.listCuestionarios=data;
      this.loading=false;
    },error=>{
      this.loading=false;
      this.toastr.error(`${error.error.message}`,'Error');
      console.log(error);
    })
  }
  eliminarCuestionario(i:number|undefined){
    this.loading=true;
    this.cuestionarioService.deleteCuestionario(i!).subscribe(data=>{
      console.log(data);
      this.loading=false;
      this.toastr.success(`${data.message}`,'Eliminado');
      this.getCuestionarios();
    },error=>{
      this.loading=false;
      this.toastr.error(`${error.error.message}`,'Error');

    })
  }
}

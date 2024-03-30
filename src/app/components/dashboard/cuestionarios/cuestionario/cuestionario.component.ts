import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CuestionarioService } from 'src/app/services/cuestionario.service';

@Component({
  selector: 'app-cuestionario',
  templateUrl: './cuestionario.component.html',
  styleUrls: ['./cuestionario.component.css']
})
export class CuestionarioComponent implements OnInit{
  idCuestionario:number=0;
  loading=false;
  cuestionario:any;
  constructor(private cuestionarioService:CuestionarioService,
    private toastr:ToastrService,
    private activatedRouted:ActivatedRoute){
      this.idCuestionario=+this.activatedRouted.snapshot.paramMap.get('id')!;
    }
  ngOnInit(): void {
    this.getCuestionario();
  }

    getCuestionario(){
      this.loading=true;
      this.cuestionarioService.getCuestionario(this.idCuestionario).subscribe(data=>{
        this.cuestionario=data;
        console.log(this.cuestionario);
        this.loading=false;
      })
    }

}

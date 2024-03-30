import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Cuestionario } from 'src/app/models/cuestionario';
import { CuestionarioService } from 'src/app/services/cuestionario.service';
import { RespuestaCuestionarioService } from 'src/app/services/respuesta-cuestionario.service';

@Component({
  selector: 'app-lista-de-cuestionarios',
  templateUrl: './lista-de-cuestionarios.component.html',
  styleUrls: ['./lista-de-cuestionarios.component.css']
})
export class ListaDeCuestionariosComponent {
  loading = false;
  listCuestionarios: Cuestionario[] = [];
  constructor(private cuestionarioService: CuestionarioService,private router:Router,private respuestaCuestionario:RespuestaCuestionarioService) {

  }
  ngOnInit(): void {
    this.getListCuestionarios();
  }
  getListCuestionarios() {
    this.loading = true;
    this.cuestionarioService.getListCuestinarios().subscribe(data => {
      console.log(data);
      this.listCuestionarios = data;
      this.loading = false;
    })
  }
  ingresarNombre(idCuestionario: number) {
    this.respuestaCuestionario.idCuestionario=idCuestionario;
    this.router.navigate(['/inicio/listCuestionarios/ingresarNombre']);
  }
}

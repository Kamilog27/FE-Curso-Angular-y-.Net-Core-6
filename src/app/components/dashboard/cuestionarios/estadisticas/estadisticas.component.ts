import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { RespuestaCuestionario } from 'src/app/models/respuestaCuestionario';
import { RespuestaCuestionarioService } from 'src/app/services/respuesta-cuestionario.service';

@Component({
  selector: 'app-estadisticas',
  templateUrl: './estadisticas.component.html',
  styleUrls: ['./estadisticas.component.css']
})
export class EstadisticasComponent implements OnInit {
  idCuestionario!: number;
  loading = false;
  listRespuestaCuestionario: RespuestaCuestionario[] = [];
  constructor(private respuestaCuestionarioService: RespuestaCuestionarioService,
    private activatedRoute: ActivatedRoute,
    private toastr: ToastrService) { }
  ngOnInit(): void {
    this.idCuestionario = +this.activatedRoute.snapshot.paramMap.get('id')!;
    this.GetListCuestionarioService();
  }

  GetListCuestionarioService() {
    this.loading = true;
    this.respuestaCuestionarioService.getListCuestionarioRespuesta(this.idCuestionario).subscribe(data => {
      this.loading = false;
      this.listRespuestaCuestionario = data;

    })
  }
  eliminarRespuestaCuestionario(i: number) {
    this.loading = true;
    this.respuestaCuestionarioService.eliminarRespuestaCuestionario(i).subscribe(data => {
      console.log(data);
      this.loading = false;
      this.toastr.success(`${data.message}`, 'Eliminado!');
      this.GetListCuestionarioService();
    }, error => {
      this.toastr.error(`${error.error.message}`, 'Error');
      this.loading = false;
    })
  }
}

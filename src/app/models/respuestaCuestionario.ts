import { RespuestaCuestionarioDetalle } from "./respuestaCuestionarioDetalle";

export class RespuestaCuestionario{
    id?:number;
    CuestionarioId:number;
    nombreParticipante:string;
    listRtaCuestionarioDetalle:RespuestaCuestionarioDetalle[];
    fecha?:string
    constructor(CuestionarioId:number,NombreParticipante:string,listaRtaCuestionarioDetalle:RespuestaCuestionarioDetalle[]){
        this.CuestionarioId=CuestionarioId;
        this.nombreParticipante=NombreParticipante;
        this.listRtaCuestionarioDetalle=listaRtaCuestionarioDetalle;
    }
}
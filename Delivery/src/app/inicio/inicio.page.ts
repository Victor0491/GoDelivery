import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {

  retirosPendientes: number = 0;
  retirosRealizados: number = 0;
  entregasPendientes: number = 0;
  entregasRealizadas: number = 0;
  porcentajeEntregas: number = 0;
  porcentajeRetiros: number = 0;
  totalRetiros: number = 0;
  totalEntregas: number = 0;
  

  constructor() { }

  ngOnInit() {
    this.totalRetiros = 30;
    this.totalEntregas = 30;
    this.retirosRealizados = 15;
    this.entregasRealizadas = 10;
    this.retirosPendientes = this.pendiente(this.totalRetiros,this.retirosRealizados,this.retirosPendientes);
    this.entregasPendientes = this.pendiente(this.totalEntregas,this.entregasRealizadas,this.entregasPendientes);
    this.porcentajeRetiros = this.porcentaje(this.totalRetiros, this.retirosRealizados, this.porcentajeRetiros);
    this.porcentajeEntregas = this.porcentaje(this.totalEntregas, this.entregasRealizadas, this.porcentajeEntregas)
  }

  porcentaje(totales: number, camino: number, porcentaje: number ): number{
    
    porcentaje = (camino * 100 ) / totales;

    return porcentaje;
  }

  pendiente(total: number, realizado: number, pendiente: number):number{

    pendiente = total - realizado;
    return pendiente;
  }

}

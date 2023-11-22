import { Component, OnInit } from '@angular/core';
import { AuthFirebaseService } from 'src/app/service/auth-firebase.service';
import { ObjetoService } from 'src/app/service/objeto.service';
import { User } from 'src/app/models/interface';
import { ChangeDetectorRef } from '@angular/core';


@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {

  newUser: User = {
    uid : '',
    username : '',
    password : '',
    email : ''
  };

  entregas: any = [];

  userData = {
    Key : '' 
  };

  uid = '';

  // Variables de los graficos
  retirosPendientes: number = 0;
  retirosRealizados: number = 0;
  entregasPendientes: number = 0;
  entregasRealizadas: number = 0;
  porcentajeEntregas: number = 0;
  porcentajeRetiros: number = 0;
  totalRetiros: number = 0;
  totalEntregas: number = 0;

  // Variable de pedidos retirados/entregados/en ruta/etc
  cantidadPedidosRetirados: number = 0;

  cantidadPedidosEnTienda: number = 0;

  cantidadPedidosEntregado: number = 0;

  cantidadPedidosNoEntregado: number = 0;

  constructor(public auth : AuthFirebaseService,private db : ObjetoService,private cdr: ChangeDetectorRef) {

   }

   async ngOnInit() {


    await this.cargarEntregas();
    await this.obtenerCantidadPedidosRetirados();
    await this.obtenerCantidadPedidosEnTienda();
    await this.obtenerCantidadPedidosEntregado();
    await this.obtenerCantidadPedidosNoEntregado();

    this.retirosPendientes = this.pendiente(this.cantidadPedidosEnTienda,this.cantidadPedidosRetirados,this.retirosPendientes);
    this.entregasPendientes = this.pendiente(this.cantidadPedidosNoEntregado,this.cantidadPedidosEntregado,this.entregasPendientes);
    this.porcentajeRetiros = this.porcentaje(this.cantidadPedidosEnTienda,this.cantidadPedidosRetirados, this.porcentajeRetiros);
    this.porcentajeEntregas = this.porcentaje(this.cantidadPedidosNoEntregado,this.cantidadPedidosEntregado, this.porcentajeEntregas);
  }
  
  obtenerCantidadPedidosRetirados(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this.auth.getUid().then(uidUsuario => {
        const estado = 'Retirado';
        this.db.contarPedidosPorEstado(uidUsuario, estado).subscribe(cantidad => {
          this.cantidadPedidosRetirados = cantidad;
          console.log('Cantidad de pedidos Retirados:', this.cantidadPedidosRetirados);
          resolve();
        });
      });
    });
  }
  
  async obtenerCantidadPedidosEnTienda() {
    const uidUsuario = await this.auth.getUid();
    const estado = 'En tienda';
  
    return new Promise<void>((resolve, reject) => {
      this.db.contarPedidosPorEstado(uidUsuario, estado).subscribe(cantidad => {
        this.cantidadPedidosEnTienda = cantidad;
        console.log('Cantidad de pedidos en tienda:', this.cantidadPedidosEnTienda);
        resolve();
      });
    });
  }
  
  async obtenerCantidadPedidosEntregado() {
    const uidUsuario = await this.auth.getUid();
    const estado = 'Entregado';
  
    return new Promise<void>((resolve, reject) => {
      this.db.contarPedidosPorEstado(uidUsuario, estado).subscribe(cantidad => {
        this.cantidadPedidosEntregado = cantidad;
        console.log('Cantidad de pedidos entregado:', this.cantidadPedidosEntregado);
        resolve();
      });
    });
  }
  
  async obtenerCantidadPedidosNoEntregado() {
    const uidUsuario = await this.auth.getUid();
    const estadoEnTienda = 'En tienda';
    const estadoRetirado = 'Retirado';
  
    const cantidadEnTienda$ = this.db.contarPedidosPorEstado(uidUsuario, estadoEnTienda);
    const cantidadRetirados$ = this.db.contarPedidosPorEstado(uidUsuario, estadoRetirado);
  
    return new Promise<void>((resolve, reject) => {
      cantidadEnTienda$.subscribe(cantidadEnTienda => {
        this.cantidadPedidosEnTienda = cantidadEnTienda;
        this.calcularCantidadNoEntregado();
        resolve();
      });
  
      cantidadRetirados$.subscribe(cantidadRetirados => {
        this.cantidadPedidosRetirados = cantidadRetirados;
        this.calcularCantidadNoEntregado();
        resolve();
      });
    });
  }
  
  calcularCantidadNoEntregado() {
    if (typeof this.cantidadPedidosEnTienda !== 'undefined' && typeof this.cantidadPedidosRetirados !== 'undefined') {
      this.cantidadPedidosNoEntregado = this.cantidadPedidosEnTienda + this.cantidadPedidosRetirados;
      console.log('Cantidad de pedidos No Entregados:', this.cantidadPedidosNoEntregado);
    }
  }
  
  async cargarEntregas() {
    const uid = await this.auth.getUid();
    console.log(uid);
    const e = ['Entregado', 'Retirado', 'En ruta', 'Entrega parcial', 'En tienda'];
    this.db.getPedidos(uid, e).subscribe(data => {
      console.log(data);
      this.entregas = data;
    });
  }
  
  porcentaje(totales: number, camino: number, porcentaje: number): number {
    porcentaje = (camino * 10) / totales;
    console.log('camino:', camino)
    console.log('totales', totales);
    console.log('porcentaje', porcentaje);
    return porcentaje;
  }
  
  pendiente(total: number, realizado: number,pendiente: number): number {
     pendiente = total - realizado;
    console.log('Total:', total);
    console.log('Realizado', realizado);
    return pendiente;
  }
}

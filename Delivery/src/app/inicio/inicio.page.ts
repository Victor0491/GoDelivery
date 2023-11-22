import { Component, OnInit } from '@angular/core';
import { AuthFirebaseService } from 'src/app/service/auth-firebase.service';
import { ObjetoService } from 'src/app/service/objeto.service';
import { User } from 'src/app/models/interface';


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

  cantidadPedidosRetirados: number = 0;

  constructor(public auth : AuthFirebaseService,private db : ObjetoService) {


   }

  ngOnInit(){
    this.cargarEntregas();
    this.obtenerCantidadPedidosRetirados();
  }

  async obtenerCantidadPedidosRetirados() {
    const uidUsuario = await this.auth.getUid();
    console.log(uidUsuario);
    const estado = 'En tienda';
    this.cantidadPedidosRetirados = await this.db.contarPedidosPorEstado(uidUsuario, estado);
    console.log('Cantidad de pedidos Retirados:', this.cantidadPedidosRetirados);
  }

  async cargarEntregas(){
    const uid = await this.auth.getUid();
    console.log(uid);
    const e = ['Entregado','Retirado','En ruta','Entrega parcial','En tienda']
    this.db.getPedidos(uid,e).subscribe(data => {
      console.log(data)
      this.entregas = data;
    });
  }
}

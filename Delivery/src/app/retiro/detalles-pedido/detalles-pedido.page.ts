import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { ObjetoService } from '../../service/objeto.service';
import { AuthFirebaseService } from 'src/app/service/auth-firebase.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-detalles-pedido',
  templateUrl: './detalles-pedido.page.html',
  styleUrls: ['./detalles-pedido.page.scss'],
})
export class DetallesPedidoPage implements OnInit {
  
  retiro : any;
  horaCarga: string = '0';
  uid: any;
  pedidoid :any;

  constructor(
    private route: ActivatedRoute,
    private navCtrl: NavController,
    private toastController: ToastController,
    private db : ObjetoService,
    private auth : AuthFirebaseService,
  ) {
  }

  ngOnInit() {

  this.cargarRetiros();
   const now = new Date();
    this.horaCarga = now.toLocaleTimeString(); // Puedes ajustar el formato de la hora según tus preferencias
}

async cargarRetiros() {
  const id = this.route.snapshot.paramMap.get('id');
  console.log(id);

  if (id) {
    const uid = await this.auth.getUid();
    const t = id;

    this.db.getPedidosDetalles(uid, t).subscribe(data => {
      console.log(data);
      this.retiro = data;
      console.log(this.retiro)
    });
  }
}

 async mostrarMensaje() {
    const toast = await this.toastController.create({
      message: 'Pedido cargado correctamente',
      duration: 1000, // Duración en milisegundos
      position: 'bottom' // Posición en la que aparecerá el mensaje
    });
    toast.present();
  }

  async cambiarEstadoDelPedido() {
    const id = this.route.snapshot.paramMap.get('id');
    console.log(id);
    if (id) {
    const uid = await this.auth.getUid(); // Asegúrate de tener la función para obtener el UID
    const pedidoId = id // Reemplaza con el ID del pedido que deseas actualizar
    const nuevoEstado = 'Retirado'; // El nuevo estado del pedido
    
    this.db.actualizarEstadoPedido(uid, pedidoId, nuevoEstado);
  }
}
  abrirGoogleMaps(dir:string, com : string){
    const dirrecion = dir +','+ com
    const url = 'https://www.google.com/maps/search/?api=1&query=' + encodeURI(dirrecion)
    console.log(dirrecion)
    window.open(url, '_system')
    }

    
}

 
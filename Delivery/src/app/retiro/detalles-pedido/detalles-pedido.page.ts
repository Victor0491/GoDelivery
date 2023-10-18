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
  
  retiro: any ;
  horaCarga: string = '0';
  uid: any;


  constructor(
    private route: ActivatedRoute,
    private navCtrl: NavController,
    private toastController: ToastController,
    private db : ObjetoService,
    public auth : AuthFirebaseService,
  ) {
  }

  ngOnInit() {

      
}

}

    // console.log(this.retiro.estado_pedido)

    // const now = new Date();
    // this.horaCarga = now.toLocaleTimeString(); // Puedes ajustar el formato de la hora según tus preferencias
  
  // marcarComoRetirado() {
  //   if (this.retiro) {
  //     // Cambiar el estado_pedido del retiro a "Retirado" solo visualmente
  //     this.retiro.estado_pedido = 'Retirado';

  //     this.objetoService.actualizarRetiro(this.retiro);
  //     console.log(this.retiro.estado_pedido)
  //   }
  // }

  // async mostrarMensaje() {
  //   const toast = await this.toastController.create({
  //     message: 'Pedido cargado correctamente',
  //     duration: 1000, // Duración en milisegundos
  //     position: 'bottom' // Posición en la que aparecerá el mensaje
  //   });
  //   toast.present();
  // }
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-detalles-pedido',
  templateUrl: './detalles-pedido.page.html',
  styleUrls: ['./detalles-pedido.page.scss'],
})
export class DetallesPedidoPage implements OnInit {
  pedidoInfo: any = {}; // Almacena la información del pedido
  horaCarga: string = ''; // Almacena la hora de carga del pedido
  estadoPedido: string = 'Pendiente de retiro'; // Estado inicial del pedido

  constructor(
    private route: ActivatedRoute,
    private navCtrl: NavController, // Agrega NavController aquí
    private toastController: ToastController
  ) {}

  ngOnInit(): void {
    
  }

  ionViewWillEnter() {
    // Obtén los parámetros de la URL (si estás pasando información a través de la URL)
    this.route.queryParams.subscribe(params => {
      this.pedidoInfo = JSON.parse(params['pedidoInfo']);
    });
    console.log(this.pedidoInfo)

    // Obtén la hora actual
    const now = new Date();
    this.horaCarga = now.toLocaleTimeString(); // Puedes ajustar el formato de la hora según tus preferencias
  }

  async mostrarMensaje() {
    const toast = await this.toastController.create({
      message: 'Pedido cargado correctamente',
      duration: 2000, // Duración en milisegundos
      position: 'bottom' // Posición en la que aparecerá el mensaje
    });
    toast.present();

    // Cambiar el estado del pedido a "Retirado" después de realizar el retiro
    this.estadoPedido = 'Retirado';
  }

  volverPaginaAnterior() {
    this.navCtrl.back();
  }
}

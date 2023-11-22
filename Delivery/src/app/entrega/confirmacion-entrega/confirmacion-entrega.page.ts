import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { ObjetoService } from '../../service/objeto.service';
import { Router } from '@angular/router';
import { Confirmacion_entrega } from 'src/app/models/interface';
import { AuthFirebaseService } from 'src/app/service/auth-firebase.service';

@Component({
  selector: 'app-confirmacion-entrega',
  templateUrl: './confirmacion-entrega.page.html',
  styleUrls: ['./confirmacion-entrega.page.scss'],
})
export class ConfirmacionEntregaPage implements OnInit {
  rut: string = '';
  nombre: string = '';
  confirmarHabilitado: boolean = false;
  entrega: any;

  newcliente: Confirmacion_entrega = {
    rut : '',
    name : '',
    image : '',
  };  

  constructor(public alertController: AlertController,
    private route: ActivatedRoute,
    private db : ObjetoService,
    private router: Router,
    private auth : AuthFirebaseService,) { }

  ngOnInit() {
  }

  verificarCamposCompletados() {
    this.confirmarHabilitado = this.rut.trim() !== '' && this.nombre.trim() !== '';
  }

  async mostrarAlert() {
    const alert = await this.alertController.create({
      header: 'Confirmación',
      message: '¿Estás seguro de que deseas confirmar?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log('Confirmación cancelada');
          }
        },
        {
          text: 'Confirmar',
          handler: () => {
            console.log('Confirmación exitosa');
            // this.marcarComoEntregado();
            this.router.navigate(['/tabs/entrega']);
          }
        }
      ]
    });
    await alert.present();
  }

  async cambiarEstadoDelPedido() {
    const id = this.route.snapshot.paramMap.get('id');
    console.log(id);
    if (id) {
    const uid = await this.auth.getUid(); // Asegúrate de tener la función para obtener el UID
    const pedidoId = id // Reemplaza con el ID del pedido que deseas actualizar
    const nuevoEstado = 'Entregado'; // El nuevo estado del pedido
    
    this.db.actualizarEstadoPedido(uid, pedidoId, nuevoEstado);
    }
  }

  async crearEntregaConfirmacion() {
    const id = this.route.snapshot.paramMap.get('id');
    console.log(id);
    if (id) {
      const uidUsuario = await this.auth.getUid();
      const idPedido = id;
  
      this.newcliente.name = this.nombre;
      this.newcliente.rut = this.rut;
      try {
        const docRef = await this.db.crearEntregaConfirmacion(uidUsuario, idPedido, this.newcliente);
        console.log('Documento agregado con ID:', docRef.id);
      } catch (error) {
        console.error('Error al agregar documento:', error);
      }
    }
  }

  async takeImagen(){
    const dataUrl = (await this.db.takePicture('Imagen de entrega')).dataUrl;
    if (dataUrl){
    this.newcliente.image = dataUrl;
    }
  }
}

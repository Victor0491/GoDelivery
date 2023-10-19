import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { ObjetoService } from '../../service/objeto.service';
import { Router } from '@angular/router';

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

  constructor(public alertController: AlertController,private route: ActivatedRoute,private objetoService : ObjetoService,private router: Router) { }

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

// marcarComoEntregado() {
//   if (this.entrega) {
//     this.entrega.estado_pedido = 'Entregado';

//     this.objetoService.actualizarRetiro(this.entrega);
//     console.log(this.entrega.estado_pedido);
//   }
//   }
}

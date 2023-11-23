import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ObjetoService } from '../../service/objeto.service';
import { AuthFirebaseService } from 'src/app/service/auth-firebase.service';


@Component({
  selector: 'app-detalle-entrega',
  templateUrl: './detalle-entrega.page.html',
  styleUrls: ['./detalle-entrega.page.scss'],
})
export class DetalleEntregaPage implements OnInit {

  entregas: any;
  estadoSeleccionado: string = '';

  constructor(private route: ActivatedRoute,
    private objetoService : ObjetoService,
    private db : ObjetoService,
    public auth : AuthFirebaseService,
    ) {
  }

ngOnInit() {

  this.cargarEntregas();
}

async cambiarEstadoDelPedido() {
  const id = this.route.snapshot.paramMap.get('id');
  console.log(id);
    if (id) {
    const uid = await this.auth.getUid(); // Asegúrate de tener la función para obtener el UID
    const pedidoId = id // Reemplaza con el ID del pedido que deseas actualizar
    const nuevoEstado = this.estadoSeleccionado; // El nuevo estado del pedido
    console.log(nuevoEstado);
    
    this.db.actualizarEstadoPedido(uid, pedidoId, nuevoEstado);
  }
}

  async cargarEntregas() {
    const id = this.route.snapshot.paramMap.get('id');
    console.log(id);

    if (id) {
      const uid = await this.auth.getUid();
      const t = id;

      this.db.getPedidosDetalles(uid, t).subscribe(data => {
        console.log(data);
        this.entregas = data;
        console.log(this.entregas)
      });
    }
  }

  abrirGoogleMaps(dir:string, com : string){
    const dirrecion = dir +','+ com
    const url = 'https://www.google.com/maps/search/?api=1&query=' + encodeURI(dirrecion)
    window.open(url, '_system')
  }

  llamar(tele: string){
    window.open('tel:' + tele, '_system')
  }

  enviarWhatsapp(tele:string) {
    var telefono = tele;
    if(tele.length == 11) telefono = "+"+tele;
    else if(tele.length == 9) telefono = "+56"+tele;
    else if(tele.length == 8)  telefono = "+569"+tele;
    
    window.open('whatsapp://send?phone='+tele, '_system');
  }
}
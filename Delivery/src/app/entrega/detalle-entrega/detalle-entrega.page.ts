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
}
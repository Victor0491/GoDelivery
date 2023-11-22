import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { ObjetoService } from '../service/objeto.service';
import { Pedido } from '../models/interface';
import {AngularFireAuthModule, AngularFireAuth} from '@angular/fire/compat/auth';
import { User } from 'src/app/models/interface';
import { AuthFirebaseService } from 'src/app/service/auth-firebase.service';


@Component({
  selector: 'app-entrega',
  templateUrl: './entrega.page.html',
  styleUrls: ['./entrega.page.scss'],
})
export class EntregaPage implements OnInit {

  entregas: any = [];

  newUser: User = {
    uid : '',
    username : '',
    password : '',
    email : ''
  };

  userData = {
    Key : '' 
  };

  uid = '';

  constructor(private navCtrl: NavController,private route: ActivatedRoute, public auth : AuthFirebaseService, private db : ObjetoService) { }

  ngOnInit() {
    this.cargarEntregas();
  }

    async cargarEntregas(){
      const uid = await this.auth.getUid();
      console.log(uid);
      const e = ['Entregado','Retirado','En ruta','Entrega parcial']
      this.db.getPedidos(uid,e).subscribe(data => {
        console.log(data)
        this.entregas = data;
      });
    }
}

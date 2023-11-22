import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ObjetoService } from '../service/objeto.service';
import { AuthFirebaseService } from 'src/app/service/auth-firebase.service';
import { Pedido } from '../models/interface';
import {AngularFireAuthModule, AngularFireAuth} from '@angular/fire/compat/auth';
import { User } from 'src/app/models/interface';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-retiro',
  templateUrl: './retiro.page.html',
  styleUrls: ['./retiro.page.scss'],
})
export class RetiroPage {

  retiros: any = [];
  pedidos: Pedido[] = [];

  newUser: User = {
    uid : '',
    username: '',
    password: '',
    email: '',
  };

  userData = {
    Key : '' 
  };

  uid = '';


  constructor(private navCtrl: NavController,private db : ObjetoService,public auth : AuthFirebaseService, fireatuh : AngularFireAuth) {
    
  }

ngOnInit() {

  this.cargarRetiros();

}

    async cargarRetiros(){
      const uid = await this.auth.getUid();
      console.log(uid);
      const t = ['En tienda'];
      console.log(t)
      this.db.getPedidos(uid,t).subscribe(data => {
      console.log(data)
      this.retiros = data;

    });
  }
}
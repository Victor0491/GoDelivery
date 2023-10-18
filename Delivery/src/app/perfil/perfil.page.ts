import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { NavController } from '@ionic/angular';
import { AuthFirebaseService } from 'src/app/service/auth-firebase.service';
import { User } from 'src/app/models/interface';
import { ObjetoService } from 'src/app/service/objeto.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {
  username: string = '';
  usercorreo: string = '';

  newUser: User = {
    uid : '',
    username: '',
    password: '',
    email: '',
  };

  uid = '';

  userData = {
    Key : '' 
  };

  constructor(public alertControler: AlertController,private navCtrl: NavController,public auth : AuthFirebaseService,private db : ObjetoService) {
   }
  
  ngOnInit() {

    this.auth.stateAuth().subscribe( res => {
      console.log(res);
      if (res !== null) {
         this.uid = res.uid;
         this.getUserInfo(this.uid);
      } else {
      }
});

  }

  async salir() {
    this.auth.logout();
 }

 getUserInfo(uid: string) {
  console.log('getUserInfo');
  const path = 'user';
  this.db.getDoc<User>(path, uid).subscribe( res => {
         if (res !== undefined) {
           this.newUser = res;
         }
  });
}


 async presentAlert(){
  const alert = await this.alertControler.create({
    header: 'Cerrar sesión',
    message: '¿Esta seguro de querer cerrar la sesión?',
    buttons: [
      {
        text: 'Cancelar',
        role: 'cancel',
        handler: (blah) => {
          console.log('Cancelar');
        }
      },
      {
        text: 'ok',
        
        handler: (blah) => {
          console.log('Cerrar sesión');
          localStorage.removeItem('User');
          this.salir();
          this.navCtrl.navigateForward('/login');
        }
      }
    ]
  });
  await alert.present();
}
}

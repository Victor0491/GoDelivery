import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {
  username: string = '';
  usercorreo: string = '';

  constructor(public alertControler: AlertController,private navCtrl: NavController) { }
  

  ngOnInit() {

    // Recupera el dato de 'username' del LocalStorage
    const userDataString = localStorage.getItem('User');
    
    if (userDataString !== null) {
      const userData = JSON.parse(userDataString);
      this.username = userData.username;
      this.usercorreo = userData.email;
    }
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
            this.navCtrl.navigateForward('/login');
          }
        }
      ]
    });
    await alert.present();
  }
}

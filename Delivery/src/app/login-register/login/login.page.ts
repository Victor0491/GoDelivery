import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl, Validators, FormBuilder} from '@angular/forms';
import { NavController, ToastController } from '@ionic/angular';
import { User } from 'src/app/models/interface';
import { AuthFirebaseService } from 'src/app/service/auth-firebase.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {


  formularioLogin: FormGroup;

  newUser: User = {
    uid : '',
    username : '',
    password : '',
    email : ''
  };
  

  ngOnInit() {
  }

  constructor(public fb: FormBuilder, private navCtrl: NavController,private toastController: ToastController,public auth : AuthFirebaseService) {
    this.formularioLogin = this.fb.group({
      'email': ['', Validators.required], // Campo de correo electrónico
      'password': ['', Validators.required], // Campo de contraseña
    });
  }

  login() {
    const email = this.formularioLogin.value.email;
    const password = this.formularioLogin.value.password;
  
    this.auth.login(email, password)
      .then(res => {
        console.log('Ingreso con éxito');
        this.navCtrl.navigateForward('/tabs/inicio');
        // Muestra un mensaje de bienvenida
      })
      .catch(error => {
        console.log('Error al iniciar sesión:', error.message);
        // Muestra un mensaje de "La cuenta no existe"
        this.mostrarMensaje();
      });
  }

  async mostrarMensaje() {
    const toast = await this.toastController.create({
      message: 'La cuenta ingresada no es correcta',
      duration: 1000, // Duración en milisegundos
      position: 'bottom' // Posición en la que aparecerá el mensaje
    });
    toast.present();
  }

}



import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl, Validators, FormBuilder} from '@angular/forms';
import { NavController, ToastController } from '@ionic/angular';
import { User } from 'src/app/models/interface';


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
    const storedUserString = localStorage.getItem('User');
    console.log(storedUserString)
    if (storedUserString) {
      const storedUserData = JSON.parse(storedUserString);
      console.log('Datos en localStorage:', storedUserData);
    } else {
      console.log('No hay datos en localStorage.');
    }
  }

  constructor(public fb: FormBuilder, private navCtrl: NavController,private toastController: ToastController) {
    this.formularioLogin = this.fb.group({
      'email': ['', Validators.required], // Campo de correo electrónico
      'password': ['', Validators.required], // Campo de contraseña
    });
  }


  login() {
    // Recupera los datos almacenados en el LocalStorage
    const storedUserDataString = localStorage.getItem('User');

    if (storedUserDataString) {
      const storedUserData = JSON.parse(storedUserDataString);

      // Verifica si el nombre de usuario y la contraseña coinciden
      if (
        this.formularioLogin.value.email === storedUserData.email &&
        this.formularioLogin.value.password === storedUserData.password
      ) {
        // Inicio de sesión exitoso, redirige a la página principal
        this.navCtrl.navigateForward('/tabs/inicio'); // Cambia '/home' por la ruta correcta
      } else {
        // Las credenciales no coinciden, muestra un mensaje de error
        console.log('Credenciales incorrectas.');
        this.mostrarMensaje();
        
      }
    } else {
      // No se encontraron datos de usuario en el LocalStorage
      console.log('La cuenta no existe.');
      this.mostrarMensaje();
      
    }
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



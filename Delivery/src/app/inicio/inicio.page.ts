import { Component, OnInit } from '@angular/core';
import { AuthFirebaseService } from 'src/app/service/auth-firebase.service';
import { ObjetoService } from 'src/app/service/objeto.service';
import { User } from 'src/app/models/interface';


@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {

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

  constructor(public auth : AuthFirebaseService,private db : ObjetoService) {

    this.auth.stateAuth().subscribe( res => {
      console.log(res);
                if (res !== null) {
                   this.uid = res.uid;
                   this.getUserInfo(this.uid);
                   console.log(this.uid)
                }
  });

   }

  ngOnInit(){

    const uid = localStorage.getItem('uid');
    if (uid !== null) {
      // Puedes utilizar el UID recuperado desde localStorage
      console.log('UID recuperado:', uid);
    } else {
      // Manejar el caso en el que no se encontró un UID en localStorage
      console.log('No se encontró un UID en localStorage');
    }
    
  }

  getUserInfo(uid : string){
    const path = 'user';
    this.db.getDoc<User>(path, uid).subscribe( res => {
           if (res !== undefined) {
             this.newUser = res;
           }
    });
}

}

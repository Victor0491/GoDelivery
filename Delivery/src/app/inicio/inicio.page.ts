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

  uid = '';

  constructor(public auth : AuthFirebaseService,private db : ObjetoService) {

    this.auth.stateAuth().subscribe( res => {
      console.log(res);
                if (res !== null) {
                   this.uid = res.uid;
                   this.getUserInfo(this.uid);
                }
});

   }

  ngOnInit() {
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

import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { User } from '../models/interface';
import { ObjetoService } from '../service/objeto.service';

@Injectable({
  providedIn: 'root'
})
export class AuthFirebaseService {

  userData = {
    Key : '' 
  };


  newUser: User = {
    uid : '',
    username: '',
    password: '',
    email: '',
  };

  constructor(public auth: AngularFireAuth, private db : ObjetoService) { 

   

  }

  stateUser() {
    this.stateAuth().subscribe( res => {
      // console.log(res);
      if (res !== null) {
         this.getInfoUser();

      }  
   });
  }

  login(email: string, password: string) {
    return this.auth.signInWithEmailAndPassword(email, password);
  }

  
  logout() {
    return this.auth.signOut();
  }

  registrar(email: string, password: string) {
     return this.auth.createUserWithEmailAndPassword(email, password);
  }

  async getUid() {
    const user = await this.auth.currentUser;
    if (user === null) {
      return 'null';
    } else {
      return user.uid;
    }
 }

  getadi(){
    const usuario = this.getUid();
    console.log(usuario);
  }

 stateAuth() {
  return this.auth.authState;
}

async getInfoUser() {
  const uid = await this.getUid();
  const path = 'user';  
  this.db.getDoc<User>(path, uid).subscribe( res => {
        if (res !== undefined) {
              this.newUser = res;
              // console.log('datosCliente ->' , this.datosCliente);
        }
  });
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



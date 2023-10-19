import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { AngularFirestore,AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import {AngularFireAuthModule, AngularFireAuth} from '@angular/fire/compat/auth';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ObjetoService {


  constructor(public db: AngularFirestore, public auth : AngularFireAuthModule,public fireatuh : AngularFireAuth) { }


  createDoc(data: any, path: string, id: string) {
    const collection = this.db.collection(path);
    return collection.doc(id).set(data);
}

  createId(){
    return this.db.createId();
  }

  getDoc<tipo>(path: string, id: string) {
    const collection = this.db.collection<tipo>(path);
    return collection.doc(id).valueChanges();
  }

  GetCollection(path : string){
    const collection = this.db.collection(path);
    return collection.valueChanges();
  }

    getPedidos(uid: string, estados: string[]){
      return this.db.collection(`/user/${uid}/pedido`, ref => ref.where('estado_pedido', 'in', estados)).valueChanges();
    }

    getPedidosDetalles(uid: string, id_pedido: string){
      return this.db.collection(`/user/${uid}/pedido`, ref => ref.where('uid', '==', id_pedido)).valueChanges();
    }

    getSubCollection(path:string, subCollectionName:string){
      return this.db.doc(path).collection(subCollectionName).valueChanges({ idField:'uid'})
    }

    getCollection<tipo>(path: string) {
      const collection = this.db.collection<tipo>(path);
      return collection.valueChanges();
    }

    actualizarEstadoPedido(uid: string, pedidoId: string, nuevoEstado: string) {
      const pedidoRef = this.db.collection(`/user/${uid}/pedido`).doc(pedidoId);
  
      return pedidoRef.update({ estado_pedido: nuevoEstado })
        .then(() => {
          console.log('Estado del pedido actualizado con éxito');
        })
        .catch(error => {
          console.error('Error al actualizar el estado del pedido', error);
        });
    }
  }





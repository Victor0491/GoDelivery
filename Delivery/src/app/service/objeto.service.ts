import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { AngularFirestore,AngularFirestoreCollection,DocumentReference } from '@angular/fire/compat/firestore';
import {AngularFireAuthModule, AngularFireAuth} from '@angular/fire/compat/auth';
import { Observable } from 'rxjs';
import { Confirmacion_entrega } from '../models/interface';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';


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

    getPedidos(uid: string, estados: string[]){
      return this.db.collection(`/user/${uid}/pedido`, ref => ref.where('estado_pedido', 'in', estados)).valueChanges();
    }

    getPedidosDetalles(uid: string, id_pedido: string){
      return this.db.collection(`/user/${uid}/pedido`, ref => ref.where('uid', '==', id_pedido)).valueChanges();
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

    crearEntregaConfirmacion(uid: string, pedidoId: string, cliente: Confirmacion_entrega): Promise<DocumentReference<Confirmacion_entrega>> {
      const rutaColeccion = `/user/${uid}/pedido/${pedidoId}/entrega_confirmacion`;
      return this.db.collection(rutaColeccion).add(cliente) as Promise<DocumentReference<Confirmacion_entrega>>;
      
    }

    async takePicture(promptLabelHeader : string) {
      return await Camera.getPhoto({
        quality: 90,
        allowEditing: true,
        resultType: CameraResultType.DataUrl,
        source : CameraSource.Prompt,
        promptLabelHeader,
        promptLabelPhoto: 'Selecciona una imagen',
        promptLabelPicture: 'Toma una foto'
      });
    }


    async contarPedidosPorEstado(uid: string, estado: string): Promise<number> {
      const rutaColeccion = `/user/${uid}/pedido`;
  
      const querySnapshot = await this.db.collection(rutaColeccion)
        .ref.where('estado_pedido', '==', estado)
        .get();
  
      return querySnapshot.size; // Retorna el tamaño del querySnapshot, que es la cantidad de documentos obtenidos
    }

  }
  





import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { AngularFirestore,AngularFirestoreCollection } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class ObjetoService {

  private retirosRetiradosSubject = new Subject<void>();

  private retiros = [
    {
      id: '10',
      direccion: 'Dos poniente',
      numero: '4358',
      comuna: 'Quilicura',
      nombre_cliente: 'José Azul',
      telefono: '5694574534',
      nombre_tienda : 'Pc Factory',
      direccion_tienda : 'Av. Las Condes 7537',
      comuna_tienda : 'Las condes',
      numero_bultos : '2',
      estado_pedido: 'No retirado'

    },
    {
      id: '20',
      direccion: 'Camino al cerezo',
      numero: '2368',
      comuna: 'Peñalolen',
      nombre_cliente: 'Rodrigo Bueno',
      telefono: '5694574853',
      nombre_tienda : 'Sp Digital',
      direccion_tienda : 'Padre Mariano 356',
      comuna_tienda : 'Providencia',
      numero_bultos : '3',
      estado_pedido: 'No retirado'
    },
    {
      id: '30',
      direccion: 'Miraflores',
      numero: '4768',
      comuna: 'Quilicura',
      nombre_cliente: 'Erick Muñoz',
      telefono: '5694548534',
      nombre_tienda : 'Sp Digital',
      direccion_tienda : 'Padre Mariano 356',
      comuna_tienda : 'Providencia',
      numero_bultos : '1',
      estado_pedido: 'No retirado'
    }
  ]

  constructor(public db: AngularFirestore) { }


  set_User<tipo>(data: tipo, enlace : string, id : string) {
    const ref = this.db.collection<tipo>(enlace);
    return ref.doc(id).set(data);
  }

  createId(){
    return this.db.createId();
  }


  obtenerRetirosEntrega() {
    return this.retiros;
  }

  obtenerRetirosEntregaDetalle(id: string){
    return this.retiros.find(retiro => retiro.id === id);
  }

  obtenerRetirosRetirados() {
    return this.retiros.filter(retiro => retiro.estado_pedido !== 'No retirado');
  }

  obtenerRetirosRetiradosSubject() {
    return this.retirosRetiradosSubject.asObservable();
  }

  actualizarRetiro(retiro: any) {
    // Busca el retiro en el arreglo y actualiza sus datos
    const index = this.retiros.findIndex(r => r.id === retiro.id);
    if (index !== -1) {
      this.retiros[index] = retiro;
    }
    this.retirosRetiradosSubject.next();
  }
}

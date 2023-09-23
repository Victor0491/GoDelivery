import { Injectable } from '@angular/core';
import { CapacitorSQLite, SQLiteConnection, SQLiteDBConnection } from '@capacitor-community/sqlite';
import { Subject } from 'rxjs';
import { SQLiteService } from './sqlite.service';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ObjetoService {

  private sql_plugin:any;
  private sql_conn:SQLiteConnection = new SQLiteConnection(CapacitorSQLite);
  private sql_db!: SQLiteDBConnection;
  
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

  constructor(public _sqlite:SQLiteService, private toastController:ToastController) { }

  async initialQuerys() {

    var schema = `
      CREATE TABLE IF NOT EXISTS users ( 
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username VARCHAR(255),
        email VARCHAR(255),
        password VARCHAR(255)
      );
    `;

  await this._sqlite.sql_db.execute(schema);

  schema = `
    CREATE TABLE IF NOT EXISTS pedidos ( 
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      direccion VARCHAR(255),
      numero VARCHAR(255),
      comuna VARCHAR(255),
      nombre_cliente VARCHAR(255),
      telefono VARCHAR(255),
      nombre_tienda VARCHAR(255),
      direccion_tienda VARCHAR(255),
      numero_bultos INTEGER,
      estado_pedido VARCHAR(255)
    );
  `;

  await this._sqlite.sql_db.execute(schema);

  schema = `
    INSERT INTO pedidos 
    (
      id,direccion,numero,comuna,nombre_cliente,
      telefono,nombre_tienda,direccion_tienda,
      numero_bultos,estado_pedido
    ) 
    VALUES 
    (
      1, 'Miraflores A2lto','1112','Viña del mar',
      'Sebastian Cliente','+56 9 4444 8888','PC Factory',
      'Calle 1234',2,'No retirado'
    )`
  ;

  await this._sqlite.sql_db.execute(schema);
  }

  async registerUsuario(userData:any) {
    var insert = `
    INSERT INTO users (username, email, password) 
      VALUES 
    ('${userData.username}',
    '${userData.email}', 
    '${userData.password}');
    `;

    await this._sqlite.sql_db.execute(insert);
  }

  async obtenerRetirosEntrega() {
     const retiros = await this._sqlite.sql_db.query("SELECT * FROM pedidos WHERE estado_pedido='No retirado';");
     return retiros.values; 
    
  }

  async obtenerRetirosEntregaDetalle(id: string){
    const retiro = await this._sqlite.sql_db.query("SELECT * FROM pedidos WHERE id='"+id+"';");
    return retiro.values![0];
  }

  async obtenerRetirosRetirados() {
    const retiros = await this._sqlite.sql_db.query("SELECT * FROM pedidos WHERE estado_pedido = 'Retirado' OR estado_pedido = 'En ruta' OR estado_pedido='Entregado';");
    return retiros.values; 
  }

  async obtenerInicio() {
    var data = {
      retiros_pendientes: 0,
      retiros_realizados: 0,
      entregas_pendientes: 0,
      entregas_realizadas: 0
    }
    const pedidos = await this._sqlite.sql_db.query("SELECT * FROM pedidos;");
    pedidos.values!.forEach(element => {
      if(element.estado_pedido == 'En ruta') {
        data.entregas_pendientes++;
      } else if(element.estado_pedido == 'Entregado') {
        data.entregas_realizadas++;
      } else if(element.estado_pedido == 'Retirado') {
        data.retiros_realizados++;
      } else if(element.estado_pedido == 'No retirado') {
        data.retiros_pendientes++;
      }
    });
    return data;
  }

  async actualizarRetiro(retiro: any) {
    await this._sqlite.sql_db.execute(`UPDATE pedidos 
    SET direccion='${retiro.direccion}', numero='${retiro.numero}',
    comuna='${retiro.comuna}', nombre_cliente='${retiro.nombre_cliente}',
    telefono='${retiro.telefono}', nombre_tienda='${retiro.nombre_tienda}',
    direccion_tienda='${retiro.direccion_tienda}', numero_bultos='${retiro.numero_bultos}',
    estado_pedido='${retiro.estado_pedido}'
    WHERE id='${retiro.id}';`);

  }

  async login(userData:any) {
    var user = await this._sqlite.sql_db.query("SELECT * FROM users WHERE email='"+userData.email+"';");
    if(!user || !user.values || user.values[0] === undefined) {
      this.mostrarMensaje("El usuario no existe")
      return {value:false};
    }

    if(user.values[0].password != userData.password) {
      this.mostrarMensaje("La contraseña no coincide")
      return {value:false};
    }

    return {value:true,user:user.values[0]};
  }

  async mostrarMensaje(msg:string) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000, // Duración en milisegundos
      position: 'bottom' // Posición en la que aparecerá el mensaje
    });
    toast.present();
  }
}

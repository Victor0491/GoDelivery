export interface User  {
    uid : string,
    username : string,
    password : string,
    email : string,
}

export interface Pedido {
    uid: string;
    estado_pedido: string;
    comuna_tienda : string;
    nombre_tienda : string;
    numero_bultos : string;
    direccion_tienda : string;
    cliente : [];
 }

 export interface Confirmacion_entrega {
    rut : string;
    name : string;
    image : string;
 }
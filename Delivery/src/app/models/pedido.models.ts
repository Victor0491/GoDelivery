export interface Pedido {
    id: string,
    tienda:string,
    cliente: string,
    direccionRetiro: string,
    cantRetiros:number,
    logo:string,
    bultos:number,
    fechaRetiro:string,
    estado:string,
    direccionEntrega:string,
    fechaEntrega?:string,
    fechaEntregado?:string
}
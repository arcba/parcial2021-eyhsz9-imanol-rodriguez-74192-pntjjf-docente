export class Producto {
  ProductoID: number;
  ProductoNombre: string;
  ProductoStock: number;
  ProductoFechaAlta: Date;
}

export const Productos: Producto[] = [
  {
    ProductoID: 108,
    ProductoNombre: 'P1',
    ProductoStock: 5,
    ProductoFechaAlta: new Date('2017-01-23T00:00:00')
  }
];

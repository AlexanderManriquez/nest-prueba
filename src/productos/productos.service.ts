import { Injectable } from '@nestjs/common';
import { Producto } from './productos.interface';

@Injectable()
export class ProductosService {
  private productos: Producto[] = [];

  findAll(): Producto[] {
    return this.productos;
  }

  findOne(id: number): Producto | undefined {
    return this.productos.find((p) => p.id === id);
  }

  create(producto: Producto): Producto {
    this.productos.push(producto);
    return producto;
  }

  update(id: number, nuevoProducto: Producto): Producto | undefined {
    const index = this.productos.findIndex((p) => p.id === id);
    if (index === -1) return undefined;
    this.productos[index] = nuevoProducto;
    return nuevoProducto;
  }

  remove(id: number): boolean {
    const index = this.productos.findIndex((p) => p.id === id);
    if (index === -1) return false;
    this.productos.splice(index, 1);
    return true;
  }
}

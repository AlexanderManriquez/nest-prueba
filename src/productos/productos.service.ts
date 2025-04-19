import { Injectable } from '@nestjs/common';
import { Producto } from './productos.interface';
import { CrearProductoDTO } from './dto/crear-producto.dto';

@Injectable()
export class ProductosService {
  private productos: Producto[] = [];
  private idCounter = 1;

  findAll(): Producto[] {
    return this.productos;
  }

  findOne(id: number): Producto | undefined {
    return this.productos.find((p) => p.id === id);
  }

  create(producto: CrearProductoDTO): Producto {
    const nuevoProducto: Producto = {
      id: this.idCounter++,
      ...producto,
    };
    this.productos.push(nuevoProducto);
    return nuevoProducto;
  }

  update(id: number, producto: CrearProductoDTO): Producto | undefined {
    const index = this.productos.findIndex((p) => p.id === id);
    if (index === -1) return undefined;

    const productoActualizado: Producto = { id, ...producto };
    this.productos[index] = productoActualizado;
    return productoActualizado;
  }

  remove(id: number): boolean {
    const index = this.productos.findIndex((p) => p.id === id);
    if (index === -1) return false;
    this.productos.splice(index, 1);
    return true;
  }
}

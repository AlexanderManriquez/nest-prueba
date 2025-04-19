import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CrearProductoDTO } from './dto/crear-producto.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Producto } from './entities/producto.entity';

@Injectable()
export class ProductosService {
  constructor(
    @InjectRepository(Producto)
    private readonly productoRepo: Repository<Producto>,
  ) {}

  findAll(): Promise<Producto[]> {
    return this.productoRepo.find();
  }

  findOne(id: number): Promise<Producto | null> {
    return this.productoRepo.findOneBy({ id });
  }

  create(dto: CrearProductoDTO): Promise<Producto> {
    const producto = this.productoRepo.create(dto);
    return this.productoRepo.save(producto);
  }

  async update(id: number, dto: CrearProductoDTO): Promise<Producto | null> {
    const producto = await this.productoRepo.findOneBy({ id });
    if (!producto) return null;
    Object.assign(producto, dto);
    return this.productoRepo.save(producto);
  }

  async remove(id: number): Promise<boolean> {
    const result = await this.productoRepo.delete(id);
    return (result.affected ?? 0) > 0;
  }
}

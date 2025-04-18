import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ProductosService } from './productos.service';
import { Producto } from './productos.interface';

@Controller('productos')
export class ProductosController {
  constructor(private readonly productosService: ProductosService) {}

  @Get()
  findAll() {
    return this.productosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.productosService.findOne(+id);
  }

  @Post()
  create(@Body() producto: Producto) {
    return this.productosService.create(producto);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() producto: Producto) {
    return this.productosService.update(+id, producto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.productosService.remove(+id);
  }
}

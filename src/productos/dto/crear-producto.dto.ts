import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class CrearProductoDTO {
  @IsString()
  @IsNotEmpty()
  nombre: string;

  @IsNumber()
  @IsNotEmpty()
  precio: number;
}

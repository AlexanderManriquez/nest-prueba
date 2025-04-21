import { IsNotEmpty, IsString, IsNumber, Min } from 'class-validator';

export class CrearProductoDTO {
  @IsString()
  @IsNotEmpty()
  nombre: string;

  @IsNumber()
  @IsNotEmpty()
  @Min(0.01, { message: 'El precio debe ser mayor a cero' })
  precio: number;
}

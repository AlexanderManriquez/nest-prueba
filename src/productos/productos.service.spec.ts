import { ProductosService } from './productos.service';
import { CrearProductoDTO } from './dto/crear-producto.dto';

describe('ProductosService', () => {
  let service: ProductosService;

  beforeEach(() => {
    service = new ProductosService();
  });

  it('debería crear un producto', () => {
    const productoDTO: CrearProductoDTO = {
      nombre: 'Mouse',
      precio: 30,
    };

    const producto = service.create(productoDTO);

    expect(producto).toHaveProperty('id');
    expect(producto.nombre).toBe('Mouse');
    expect(producto.precio).toBe(30);
  });

  it('debería encontrar un producto por ID', () => {
    const producto = service.create({ nombre: 'Teclado', precio: 100 });
    const resultado = service.findOne(producto.id);
    expect(resultado).toEqual(producto);
  });

  it('debería actualizar un producto', () => {
    const creado = service.create({ nombre: 'Monitor', precio: 500 });
    const actualizado = service.update(creado.id, {
      nombre: 'Monitor HD',
      precio: 600,
    });

    expect(actualizado?.nombre).toBe('Monitor HD');
    expect(actualizado?.precio).toBe(600);
  });

  it('debería eliminar un producto', () => {
    const producto = service.create({ nombre: 'Webcam', precio: 80 });
    const eliminado = service.remove(producto.id);
    expect(eliminado).toBe(true);
    expect(service.findOne(producto.id)).toBeUndefined();
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { ProductosService } from './productos.service';
import { Repository } from 'typeorm';
import { Producto } from './entities/producto.entity';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('ProductosService', () => {
  let service: ProductosService;
  let repo: Repository<Producto>;

  const mockProducto = { id: 1, nombre: 'Test', precio: 100 };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductosService,
        {
          provide: getRepositoryToken(Producto),
          useValue: {
            find: jest.fn(),
            findOneBy: jest.fn(),
            create: jest.fn(),
            save: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<ProductosService>(ProductosService);
    repo = module.get<Repository<Producto>>(getRepositoryToken(Producto));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a product', async () => {
    const dto = { nombre: 'Nuevo', precio: 200 };
    const created = { id: 2, ...dto };

    jest.spyOn(repo, 'create').mockReturnValue(created as any);
    jest.spyOn(repo, 'save').mockResolvedValue(created as any);

    const result = await service.create(dto);
    expect(result).toEqual(created);
  });

  it('should return all products', async () => {
    jest.spyOn(repo, 'find').mockResolvedValue([mockProducto]);
    const result = await service.findAll();
    expect(result).toEqual([mockProducto]);
  });

  it('should return a product by ID', async () => {
    jest.spyOn(repo, 'findOneBy').mockResolvedValue(mockProducto);
    const result = await service.findOne(1);
    expect(result).toEqual(mockProducto);
  });

  it('should update a product', async () => {
    const updated = { nombre: 'Test', precio: 100 };
    const mockProducto = { id: 1, ...updated };

    jest.spyOn(repo, 'findOneBy').mockResolvedValue(mockProducto); // 💡 clave
    jest.spyOn(repo, 'save').mockResolvedValue(mockProducto);

    const result = await service.update(1, updated);
    expect(result).toEqual(mockProducto);
  });

  it('should return false if update fails', async () => {
    jest.spyOn(repo, 'update').mockResolvedValue({ affected: 0 } as any);
    const result = await service.update(999, { nombre: 'Fake', precio: 0 });
    expect(result).toBe(null);
  });

  it('should delete a product', async () => {
    jest.spyOn(repo, 'delete').mockResolvedValue({ affected: 1 } as any);
    const result = await service.remove(1);
    expect(result).toBe(true);
  });

  it('should return false if delete fails', async () => {
    jest.spyOn(repo, 'delete').mockResolvedValue({ affected: 0 } as any);
    const result = await service.remove(999);
    expect(result).toBe(false);
  });
});

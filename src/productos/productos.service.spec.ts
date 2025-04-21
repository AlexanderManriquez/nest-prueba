import { Test, TestingModule } from '@nestjs/testing';
import { ProductosService } from './productos.service';
import { Repository } from 'typeorm';
import { Producto } from './entities/producto.entity';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('ProductosService', () => {
  let service: ProductosService;
  let repo: jest.Mocked<Repository<Producto>>;

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
    repo = module.get(getRepositoryToken(Producto));
  });

  describe('create', () => {
    it('should create a product', async () => {
      const dto = { nombre: 'Nuevo', precio: 200 };
      const created = { id: 2, ...dto };

      repo.create.mockReturnValue(created);
      repo.save.mockResolvedValue(created);

      const result = await service.create(dto);

      expect(result).toEqual(created);
      // eslint-disable-next-line @typescript-eslint/unbound-method
      expect(repo.create).toHaveBeenCalledWith(dto);
      // eslint-disable-next-line @typescript-eslint/unbound-method
      expect(repo.save).toHaveBeenCalledWith(created);
    });
  });

  describe('findAll', () => {
    it('should return all products', async () => {
      repo.find.mockResolvedValue([mockProducto]);

      const result = await service.findAll();

      expect(result).toEqual([mockProducto]);
      // eslint-disable-next-line @typescript-eslint/unbound-method
      expect(repo.find).toHaveBeenCalledTimes(1);
    });
  });

  describe('findOne', () => {
    it('should return a product by id', async () => {
      repo.findOneBy.mockResolvedValue(mockProducto);

      const result = await service.findOne(1);

      expect(result).toEqual(mockProducto);
      // eslint-disable-next-line @typescript-eslint/unbound-method
      expect(repo.findOneBy).toHaveBeenCalledWith({ id: 1 });
    });

    it('should return null if not found', async () => {
      repo.findOneBy.mockResolvedValue(null);

      const result = await service.findOne(999);

      expect(result).toBeNull();
    });
  });

  describe('update', () => {
    it('should update a product', async () => {
      const dto = { nombre: 'Actualizado', precio: 300 };
      const found = { id: 1, nombre: 'Antiguo', precio: 150 };

      repo.findOneBy.mockResolvedValue(found);
      repo.save.mockResolvedValue({ ...found, ...dto });

      const result = await service.update(1, dto);

      expect(result).toEqual({ id: 1, ...dto });
      // eslint-disable-next-line @typescript-eslint/unbound-method
      expect(repo.findOneBy).toHaveBeenCalledWith({ id: 1 });
      // eslint-disable-next-line @typescript-eslint/unbound-method
      expect(repo.save).toHaveBeenCalledWith({ ...found, ...dto });
    });

    it('should return null if product not found', async () => {
      repo.findOneBy.mockResolvedValue(null);

      const result = await service.update(999, { nombre: 'Nada', precio: 0 });

      expect(result).toBeNull();
    });
  });

  describe('remove', () => {
    it('should delete a product', async () => {
      repo.delete.mockResolvedValue({ affected: 1 } as any);

      const result = await service.remove(1);

      expect(result).toBe(true);
      // eslint-disable-next-line @typescript-eslint/unbound-method
      expect(repo.delete).toHaveBeenCalledWith(1);
    });

    it('should return false if delete fails', async () => {
      repo.delete.mockResolvedValue({ affected: 0 } as any);

      const result = await service.remove(999);

      expect(result).toBe(false);
    });
  });
});

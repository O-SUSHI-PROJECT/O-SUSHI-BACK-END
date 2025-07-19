import { Test, TestingModule } from '@nestjs/testing';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

describe('ProductController', () => {
  let controller: ProductController;
  let service: ProductService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductController],
      providers: [ProductService],
    }).compile();

    controller = module.get<ProductController>(ProductController);
    service = module.get<ProductService>(ProductService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a product', () => {
      const createProductDto: CreateProductDto = {
        name: 'Test Product',
        description: 'Test Description',
        price: 15.99,
        category: 'Test Category',
      };

      const result = controller.create(createProductDto);
      expect(result.name).toBe('Test Product');
      expect(result.price).toBe(15.99);
    });
  });

  describe('findAll', () => {
    it('should return all products when no category is provided', () => {
      const result = controller.findAll();
      expect(result).toHaveLength(4);
    });

    it('should return products filtered by category', () => {
      const result = controller.findAll('Sushi');
      expect(result).toHaveLength(1);
      expect(result[0].category).toBe('Sushi');
    });
  });

  describe('findAvailable', () => {
    it('should return only available products', () => {
      const result = controller.findAvailable();
      expect(result.every(product => product.isAvailable)).toBe(true);
    });
  });

  describe('findOne', () => {
    it('should return a product by id', () => {
      const result = controller.findOne('1');
      expect(result.id).toBe('1');
      expect(result.name).toBe('Sushi California');
    });
  });

  describe('update', () => {
    it('should update a product', () => {
      const updateProductDto: UpdateProductDto = {
        name: 'Updated Product',
        price: 25.99,
      };

      const result = controller.update('1', updateProductDto);
      expect(result.name).toBe('Updated Product');
      expect(result.price).toBe(25.99);
    });
  });

  describe('remove', () => {
    it('should remove a product', () => {
      const initialLength = service.findAll().length;
      controller.remove('1');
      const finalLength = service.findAll().length;
      expect(finalLength).toBe(initialLength - 1);
    });
  });
}); 
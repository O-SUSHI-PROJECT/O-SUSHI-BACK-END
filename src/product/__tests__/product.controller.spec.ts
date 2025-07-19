import { Test, TestingModule } from '@nestjs/testing';
import { ProductController } from '../product.controller';
import { ProductService } from '../product.service';

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

    it('should return products filtered by category (case insensitive)', () => {
      const result = controller.findAll('sushi');
      expect(result).toHaveLength(1);
      expect(result[0].category).toBe('Sushi');
    });
  });

  describe('findAvailable', () => {
    it('should return only available products', () => {
      const result = controller.findAvailable();
      expect(result.every(product => product.isAvailable)).toBe(true);
      expect(result.length).toBe(3);
    });

    it('should not include unavailable products', () => {
      const result = controller.findAvailable();
      const unavailableProduct = result.find(p => p.name === 'Hot Roll');
      expect(unavailableProduct).toBeUndefined();
    });
  });
}); 
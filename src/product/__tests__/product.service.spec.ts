import { Test, TestingModule } from '@nestjs/testing';
import { ProductService } from '../product.service';

describe('ProductService', () => {
  let service: ProductService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductService],
    }).compile();

    service = module.get<ProductService>(ProductService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return all products', () => {
      const result = service.findAll();
      expect(result).toHaveLength(4);
      expect(result[0].name).toBe('Sushi California');
      expect(result[1].name).toBe('Temaki Salmão');
      expect(result[2].name).toBe('Sashimi Mix');
      expect(result[3].name).toBe('Hot Roll');
    });
  });

  describe('findByCategory', () => {
    it('should return products by category', () => {
      const result = service.findByCategory('Sushi');
      expect(result).toHaveLength(1);
      expect(result[0].category).toBe('Sushi');
    });

    it('should return products by partial category match', () => {
      const result = service.findByCategory('sushi');
      expect(result).toHaveLength(1);
      expect(result[0].category).toBe('Sushi');
    });

    it('should return empty array for non-existent category', () => {
      const result = service.findByCategory('NonExistent');
      expect(result).toHaveLength(0);
    });
  });

  describe('findAvailable', () => {
    it('should return only available products', () => {
      const result = service.findAvailable();
      expect(result.every(product => product.isAvailable)).toBe(true);
      expect(result.length).toBe(3); // 3 produtos disponíveis, 1 indisponível
    });

    it('should not include unavailable products', () => {
      const result = service.findAvailable();
      const unavailableProduct = result.find(p => p.name === 'Hot Roll');
      expect(unavailableProduct).toBeUndefined();
    });
  });
}); 
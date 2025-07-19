import { Test, TestingModule } from '@nestjs/testing';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { NotFoundException } from '@nestjs/common';

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
    });
  });

  describe('findOne', () => {
    it('should return a product by id', () => {
      const result = service.findOne('1');
      expect(result.name).toBe('Sushi California');
      expect(result.id).toBe('1');
    });

    it('should throw NotFoundException for non-existent id', () => {
      expect(() => service.findOne('999')).toThrow(NotFoundException);
    });
  });

  describe('findByCategory', () => {
    it('should return products by category', () => {
      const result = service.findByCategory('Sushi');
      expect(result).toHaveLength(1);
      expect(result[0].category).toBe('Sushi');
    });

    it('should return empty array for non-existent category', () => {
      const result = service.findByCategory('NonExistent');
      expect(result).toHaveLength(0);
    });
  });

  describe('create', () => {
    it('should create a new product', () => {
      const createProductDto: CreateProductDto = {
        name: 'Test Product',
        description: 'Test Description',
        price: 15.99,
        category: 'Test Category',
      };

      const result = service.create(createProductDto);
      expect(result.name).toBe('Test Product');
      expect(result.id).toBe('5');
      expect(result.isAvailable).toBe(true);
      expect(result.createdAt).toBeInstanceOf(Date);
    });
  });

  describe('update', () => {
    it('should update an existing product', () => {
      const updateProductDto: UpdateProductDto = {
        name: 'Updated Product',
        price: 20.99,
      };

      const result = service.update('1', updateProductDto);
      expect(result.name).toBe('Updated Product');
      expect(result.price).toBe(20.99);
      expect(result.updatedAt).toBeInstanceOf(Date);
    });

    it('should throw NotFoundException for non-existent id', () => {
      const updateProductDto: UpdateProductDto = {
        name: 'Updated Product',
      };

      expect(() => service.update('999', updateProductDto)).toThrow(NotFoundException);
    });
  });

  describe('remove', () => {
    it('should remove a product', () => {
      const initialLength = service.findAll().length;
      service.remove('1');
      const finalLength = service.findAll().length;
      expect(finalLength).toBe(initialLength - 1);
    });

    it('should throw NotFoundException for non-existent id', () => {
      expect(() => service.remove('999')).toThrow(NotFoundException);
    });
  });

  describe('findAvailable', () => {
    it('should return only available products', () => {
      const result = service.findAvailable();
      expect(result.every(product => product.isAvailable)).toBe(true);
      expect(result.length).toBeLessThan(service.findAll().length);
    });
  });
}); 
import { Test, TestingModule } from '@nestjs/testing';
import { OrderService } from '../order.service';
import { ProductService } from '../../product/product.service';
import { CreateOrderDto } from '../dto/create-order.dto';
import { BadRequestException } from '@nestjs/common';

describe('OrderService', () => {
  let service: OrderService;
  let productService: ProductService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OrderService, ProductService],
    }).compile();

    service = module.get<OrderService>(OrderService);
    productService = module.get<ProductService>(ProductService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new order successfully', () => {
      const createOrderDto: CreateOrderDto = {
        items: [
          { productId: '1', quantity: 2 },
          { productId: '2', quantity: 1 },
        ],
        customerName: 'João Silva',
        customerPhone: '(11) 99999-9999',
        deliveryAddress: 'Rua das Flores, 123',
        paymentMethod: 'CREDIT_CARD',
      };

      const result = service.create(createOrderDto);

      expect(result.id).toMatch(/ORD-\d{4}-\d{3}/);
      expect(result.status).toBe('PENDING');
      expect(result.customerName).toBe('João Silva');
      expect(result.items).toHaveLength(2);
      expect(result.subtotal).toBeGreaterThan(0);
      expect(result.total).toBeGreaterThanOrEqual(result.subtotal);
    });

    it('should calculate delivery fee for orders under R$ 50', () => {
      const createOrderDto: CreateOrderDto = {
        items: [{ productId: '2', quantity: 1 }], // R$ 18,50
        customerName: 'João Silva',
        customerPhone: '(11) 99999-9999',
        deliveryAddress: 'Rua das Flores, 123',
        paymentMethod: 'CREDIT_CARD',
      };

      const result = service.create(createOrderDto);

      expect(result.subtotal).toBe(18.5);
      expect(result.deliveryFee).toBe(5.0);
      expect(result.total).toBe(23.5);
    });

    it('should not charge delivery fee for orders over R$ 50', () => {
      const createOrderDto: CreateOrderDto = {
        items: [
          { productId: '1', quantity: 2 }, // R$ 51,80
          { productId: '3', quantity: 1 }, // R$ 32,00
        ],
        customerName: 'João Silva',
        customerPhone: '(11) 99999-9999',
        deliveryAddress: 'Rua das Flores, 123',
        paymentMethod: 'CREDIT_CARD',
      };

      const result = service.create(createOrderDto);

      expect(result.subtotal).toBeGreaterThan(50);
      expect(result.deliveryFee).toBe(0);
      expect(result.total).toBe(result.subtotal);
    });

    it('should throw error for unavailable product', () => {
      const createOrderDto: CreateOrderDto = {
        items: [{ productId: '4', quantity: 1 }], // Hot Roll - indisponível
        customerName: 'João Silva',
        customerPhone: '(11) 99999-9999',
        deliveryAddress: 'Rua das Flores, 123',
        paymentMethod: 'CREDIT_CARD',
      };

      expect(() => service.create(createOrderDto)).toThrow(BadRequestException);
    });
  });
});

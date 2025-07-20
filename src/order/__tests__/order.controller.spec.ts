import { Test, TestingModule } from '@nestjs/testing';
import { OrderController } from '../order.controller';
import { OrderService } from '../order.service';
import { ProductService } from '../../product/product.service';
import { CreateOrderDto } from '../dto/create-order.dto';

describe('OrderController', () => {
  let controller: OrderController;
  let service: OrderService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrderController],
      providers: [OrderService, ProductService],
    }).compile();

    controller = module.get<OrderController>(OrderController);
    service = module.get<OrderService>(OrderService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a new order', () => {
      const createOrderDto: CreateOrderDto = {
        items: [{ productId: '1', quantity: 1 }],
        customerName: 'João Silva',
        customerPhone: '(11) 99999-9999',
        deliveryAddress: 'Rua das Flores, 123',
        paymentMethod: 'CREDIT_CARD',
      };

      const result = controller.create(createOrderDto);

      expect(result.id).toMatch(/ORD-\d{4}-\d{3}/);
      expect(result.status).toBe('PENDING');
      expect(result.customerName).toBe('João Silva');
    });
  });
});

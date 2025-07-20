import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { Order, OrderItem } from './entities/order.entity';
import { CreateOrderDto, CreateOrderItemDto } from './dto/create-order.dto';
import { ProductService } from '../product/product.service';

@Injectable()
export class OrderService {
  private orders: Order[] = [];
  private orderCounter = 1;

  constructor(private readonly productService: ProductService) {}

  create(createOrderDto: CreateOrderDto): Order {
    const validatedItems: OrderItem[] = [];
    let subtotal = 0;

    for (const itemDto of createOrderDto.items) {
      const product = this.productService.findOne(itemDto.productId);

      if (!product.isAvailable) {
        throw new BadRequestException(
          `Produto ${product.name} não está disponível`,
        );
      }

      const totalPrice = product.price * itemDto.quantity;
      subtotal += totalPrice;

      validatedItems.push({
        productId: product.id,
        productName: product.name,
        quantity: itemDto.quantity,
        unitPrice: product.price,
        totalPrice,
      });
    }

    const deliveryFee = subtotal <= 50 ? 5.0 : 0;
    const total = subtotal + deliveryFee;

    const maxPreparationTime = Math.max(
      ...validatedItems.map((item) => {
        const product = this.productService.findOne(item.productId);
        return product.preparationTime || 15;
      }),
    );
    const estimatedDeliveryTime = maxPreparationTime + 30;

    const newOrder = new Order({
      id: `ORD-${new Date().getFullYear()}-${this.orderCounter
        .toString()
        .padStart(3, '0')}`,
      status: 'PENDING',
      items: validatedItems,
      subtotal,
      deliveryFee,
      total,
      customerName: createOrderDto.customerName,
      customerPhone: createOrderDto.customerPhone,
      deliveryAddress: createOrderDto.deliveryAddress,
      notes: createOrderDto.notes,
      paymentMethod: createOrderDto.paymentMethod,
      createdAt: new Date(),
      updatedAt: new Date(),
      estimatedDeliveryTime,
    });

    this.orders.push(newOrder);
    this.orderCounter++;

    return newOrder;
  }
}

import { ApiProperty } from '@nestjs/swagger';

export class OrderItem {
  @ApiProperty({
    description: 'ID do produto',
    example: '1',
  })
  productId: string;

  @ApiProperty({
    description: 'Nome do produto',
    example: 'Sushi California',
  })
  productName: string;

  @ApiProperty({
    description: 'Quantidade do item',
    example: 2,
    minimum: 1,
  })
  quantity: number;

  @ApiProperty({
    description: 'Preço unitário do item',
    example: 25.9,
    minimum: 0,
  })
  unitPrice: number;

  @ApiProperty({
    description: 'Preço total do item (quantidade × preço unitário)',
    example: 51.8,
    minimum: 0,
  })
  totalPrice: number;
}

export class Order {
  @ApiProperty({
    description: 'ID único do pedido',
    example: 'ORD-2024-001',
  })
  id: string;

  @ApiProperty({
    description: 'Status do pedido',
    example: 'PENDING',
    enum: [
      'PENDING',
      'CONFIRMED',
      'PREPARING',
      'READY',
      'DELIVERED',
      'CANCELLED',
    ],
  })
  status: string;

  @ApiProperty({
    description: 'Lista de itens do pedido',
    type: [OrderItem],
  })
  items: OrderItem[];

  @ApiProperty({
    description: 'Subtotal do pedido (sem taxas)',
    example: 76.3,
    minimum: 0,
  })
  subtotal: number;

  @ApiProperty({
    description: 'Taxa de entrega',
    example: 5.0,
    minimum: 0,
  })
  deliveryFee: number;

  @ApiProperty({
    description: 'Total do pedido (subtotal + taxa de entrega)',
    example: 81.3,
    minimum: 0,
  })
  total: number;

  @ApiProperty({
    description: 'Nome do cliente',
    example: 'João Silva',
  })
  customerName: string;

  @ApiProperty({
    description: 'Telefone do cliente',
    example: '(11) 99999-9999',
  })
  customerPhone: string;

  @ApiProperty({
    description: 'Endereço de entrega',
    example: 'Rua das Flores, 123 - Apto 45, São Paulo - SP',
  })
  deliveryAddress: string;

  @ApiProperty({
    description: 'Observações do pedido',
    example: 'Sem wasabi, por favor',
    required: false,
  })
  notes?: string;

  @ApiProperty({
    description: 'Forma de pagamento',
    example: 'CREDIT_CARD',
    enum: ['CASH', 'CREDIT_CARD', 'DEBIT_CARD', 'PIX'],
  })
  paymentMethod: string;

  @ApiProperty({
    description: 'Data de criação do pedido',
    example: '2024-01-01T18:30:00.000Z',
  })
  createdAt: Date;

  @ApiProperty({
    description: 'Data da última atualização do pedido',
    example: '2024-01-01T18:30:00.000Z',
  })
  updatedAt: Date;

  @ApiProperty({
    description: 'Tempo estimado de entrega em minutos',
    example: 45,
    minimum: 0,
  })
  estimatedDeliveryTime: number;

  constructor(props: Partial<Order>) {
    Object.assign(this, props);
  }
}

import {
  Controller,
  Post,
  Body,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { Order } from './entities/order.entity';

@ApiTags('Pedidos')
@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  @ApiOperation({
    summary: 'Enviar pedido',
    description: 'Cria um novo pedido com validação de produtos e cálculo automático de valores'
  })
  @ApiResponse({
    status: 201,
    description: 'Pedido enviado com sucesso',
    type: Order
  })
  @ApiResponse({
    status: 400,
    description: 'Dados inválidos ou produto indisponível'
  })
  @ApiResponse({
    status: 401,
    description: 'Não autorizado - API key inválida'
  })
  create(@Body() createOrderDto: CreateOrderDto): Order {
    return this.orderService.create(createOrderDto);
  }
} 
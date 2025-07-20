import {
  IsString,
  IsNumber,
  IsOptional,
  IsArray,
  Min,
  IsEnum,
  ValidateNested,
  IsNotEmpty,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class CreateOrderItemDto {
  @ApiProperty({
    description: 'ID do produto',
    example: '1',
  })
  @IsString()
  @IsNotEmpty()
  productId: string;

  @ApiProperty({
    description: 'Quantidade do item',
    example: 2,
    minimum: 1,
  })
  @IsNumber()
  @Min(1)
  quantity: number;
}

export class CreateOrderDto {
  @ApiProperty({
    description: 'Lista de itens do pedido',
    type: [CreateOrderItemDto],
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateOrderItemDto)
  items: CreateOrderItemDto[];

  @ApiProperty({
    description: 'Nome do cliente',
    example: 'João Silva',
  })
  @IsString()
  @IsNotEmpty()
  customerName: string;

  @ApiProperty({
    description: 'Telefone do cliente',
    example: '(11) 99999-9999',
  })
  @IsString()
  @IsNotEmpty()
  customerPhone: string;

  @ApiProperty({
    description: 'Endereço de entrega',
    example: 'Rua das Flores, 123 - Apto 45, São Paulo - SP',
  })
  @IsString()
  @IsNotEmpty()
  deliveryAddress: string;

  @ApiProperty({
    description: 'Observações do pedido',
    example: 'Sem wasabi, por favor',
    required: false,
  })
  @IsOptional()
  @IsString()
  notes?: string;

  @ApiProperty({
    description: 'Forma de pagamento',
    example: 'CREDIT_CARD',
    enum: ['CASH', 'CREDIT_CARD', 'DEBIT_CARD', 'PIX'],
  })
  @IsString()
  @IsEnum(['CASH', 'CREDIT_CARD', 'DEBIT_CARD', 'PIX'])
  paymentMethod: string;
}

import { ApiProperty } from '@nestjs/swagger';

export class Product {
  @ApiProperty({
    description: 'ID único do produto',
    example: '1',
  })
  id: string;

  @ApiProperty({
    description: 'Nome do produto',
    example: 'Sushi California',
  })
  name: string;

  @ApiProperty({
    description: 'Descrição detalhada do produto',
    example: 'Sushi tradicional com salmão, abacate e pepino',
  })
  description: string;

  @ApiProperty({
    description: 'Preço do produto em reais',
    example: 25.9,
    minimum: 0,
  })
  price: number;

  @ApiProperty({
    description: 'Categoria do produto',
    example: 'Sushi',
    enum: ['Sushi', 'Temaki', 'Sashimi', 'Hot Roll'],
  })
  category: string;

  @ApiProperty({
    description: 'URL da imagem do produto',
    example: 'https://image.com/california-sushi.jpg',
    required: false,
  })
  imageUrl?: string;

  @ApiProperty({
    description: 'Indica se o produto está disponível para pedido',
    example: true,
  })
  isAvailable: boolean;

  @ApiProperty({
    description: 'Lista de ingredientes do produto',
    example: ['Salmão', 'Abacate', 'Pepino', 'Arroz', 'Alga Nori'],
    required: false,
    type: [String],
  })
  ingredients?: string[];

  @ApiProperty({
    description: 'Tempo de preparo em minutos',
    example: 15,
    minimum: 0,
    required: false,
  })
  preparationTime?: number;

  @ApiProperty({
    description: 'Data de criação do produto',
    example: '2024-01-01T00:00:00.000Z',
  })
  createdAt: Date;

  @ApiProperty({
    description: 'Data da última atualização do produto',
    example: '2024-01-01T00:00:00.000Z',
  })
  updatedAt: Date;

  constructor(props: Partial<Product>) {
    Object.assign(this, props);
  }
}

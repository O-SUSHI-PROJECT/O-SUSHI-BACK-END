import { Controller, Get, Query } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiQuery,
  ApiResponse,
  ApiSecurity,
} from '@nestjs/swagger';
import { ProductService } from './product.service';
import { Product } from './entities/product.entity';

@ApiTags('Produtos')
@ApiSecurity('api-key')
@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  @ApiOperation({
    summary: 'Listar produtos',
    description:
      'Retorna uma lista de todos os produtos disponíveis, com opção de filtrar por categoria',
  })
  @ApiQuery({
    name: 'category',
    required: false,
    description: 'Filtrar produtos por categoria',
    enum: ['Sushi', 'Temaki', 'Sashimi', 'Hot Roll'],
    example: 'Sushi',
  })
  @ApiResponse({
    status: 200,
    description: 'Lista de produtos retornada com sucesso',
    type: [Product],
  })
  @ApiResponse({
    status: 401,
    description: 'Não autorizado - API key inválida',
  })
  findAll(@Query('category') category?: string): Product[] {
    if (category) {
      return this.productService.findByCategory(category);
    }
    return this.productService.findAll();
  }

  @Get('available')
  @ApiOperation({
    summary: 'Listar produtos disponíveis',
    description: 'Retorna apenas os produtos que estão disponíveis para pedido',
  })
  @ApiResponse({
    status: 200,
    description: 'Lista de produtos disponíveis retornada com sucesso',
    type: [Product],
  })
  @ApiResponse({
    status: 401,
    description: 'Não autorizado - API key inválida',
  })
  findAvailable(): Product[] {
    return this.productService.findAvailable();
  }
}

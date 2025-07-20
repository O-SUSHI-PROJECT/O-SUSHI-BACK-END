import { ApiProperty } from '@nestjs/swagger';

export class AuthHeaderDto {
  @ApiProperty({
    description: 'Chave de API para autenticação',
    example: 'your-api-key-here',
    name: 'x-api-key'
  })
  'x-api-key': string;
}

export class AuthErrorResponseDto {
  @ApiProperty({
    description: 'Código do erro',
    example: 'UNAUTHORIZED'
  })
  errorCode: string;

  @ApiProperty({
    description: 'Código de status HTTP',
    example: 401
  })
  statusCode: number;

  @ApiProperty({
    description: 'Mensagem de erro',
    example: 'Invalid credentials'
  })
  errorMessage: string;

  @ApiProperty({
    description: 'Dados adicionais do erro',
    example: {}
  })
  data: Record<string, any>;
} 
import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

interface Status {
  status: string;
  startTime: string;
}

@ApiTags('Sistema')
@Controller('health')
export default class HealthController {
  private readonly deployAt: Date;

  constructor() {
    this.deployAt = new Date();
  }

  @Get()
  @ApiOperation({
    summary: 'Verificar status da API',
    description: 'Retorna o status de saúde da aplicação e horário de inicialização'
  })
  @ApiResponse({
    status: 200,
    description: 'API funcionando normalmente',
    schema: {
      type: 'object',
      properties: {
        status: { type: 'string', example: 'ok' },
        startTime: { type: 'string', example: '18/07/2025, 21:09:19' }
      }
    }
  })
  check(): Status {
    return {
      status: 'ok',
      startTime: this.deployAt.toLocaleString(),
    };
  }
}

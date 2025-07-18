import { Controller, Get } from '@nestjs/common';

interface Status {
  status: string;
  startTime: string;
}
@Controller('health')
export default class HealthController {
  private readonly deployAt: Date;

  constructor() {
    this.deployAt = new Date();
  }

  @Get()
  check(): Status {
    return {
      status: 'ok',
      startTime: this.deployAt.toLocaleString(),
    };
  }
}

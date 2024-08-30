import { Controller, Get, HttpStatus } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { HealthCheck, HealthCheckService, TypeOrmHealthIndicator } from '@nestjs/terminus';
import { ResponseDto } from 'src/shared/dtos';

@ApiTags('Health Check')
@Controller('health')
export class HealthController {
  constructor(
    private health: HealthCheckService,
    private db: TypeOrmHealthIndicator,
  ) {}

  @ApiOperation({ summary: 'Health Check' })
  @Get()
  @HealthCheck()
  async check() {
    const health = await this.health.check([async () => this.db.pingCheck('database')]);
    return new ResponseDto(HttpStatus.OK, 'Checking application health...', health);
  }
}

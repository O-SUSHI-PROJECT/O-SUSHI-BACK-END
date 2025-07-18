import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from '../auth.service';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    process.env = {
      API_KEY: 'test-api-key',
    };
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthService],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });



  it('should return true when have the same api-key', () => {
    expect(service.validateApiKey('test-api-key')).toBe(true);
  });

});

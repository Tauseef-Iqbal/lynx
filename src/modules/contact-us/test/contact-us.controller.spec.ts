import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from '../contact-us.controller';
import { AuthService } from '../contact-us.service';

describe('AdminController', () => {
  let controller: AuthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [AuthService],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

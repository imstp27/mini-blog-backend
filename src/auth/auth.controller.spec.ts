import { Test, TestingModule } from '@nestjs/testing';
import { userAuth } from '../utils/mock';
import { InputUserAuth } from '../users/dto/users.input';
import { UserAuth } from '../users/dto/users.reponse';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

describe('Auth Controller', () => {
  let controller: AuthController;
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [{
        provide: AuthService,
        useValue: {
          validateUser: jest.fn()
        }
      }]
    }).compile();

    controller = module.get<AuthController>(AuthController);
    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('login', () => {
    let result: UserAuth

    beforeEach(async () => {
      jest.spyOn(service, 'validateUser').mockResolvedValue(userAuth);
      result = await controller.login(new InputUserAuth("username", "password"))
    })

    it('should call service.validateUser once', async () => {
      expect(service.validateUser).toBeCalledTimes(1)
    });

    it('should return a user', async () => {
      expect(result).toEqual(userAuth);
    });
  });

});

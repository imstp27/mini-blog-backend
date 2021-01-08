import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { confidential, userAuth, userRO } from '../utils/mock';
import { UsersService } from '../users/users.service';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;
  let jwtService: JwtService;
  let usersService: UsersService;
  
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: JwtService,
          useValue: {
            sign: jest.fn(),
          }
        },
        {
          provide: UsersService,
          useValue: {
            login: jest.fn()
          },
        }],
    }).compile();

    service = module.get<AuthService>(AuthService);
    jwtService = module.get<JwtService>(JwtService);
    usersService = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('validateUser', () => {

    it('should call repository.find once', async () => {
      jest.spyOn(usersService, 'login').mockResolvedValue(null)
      await service.validateUser("username", "password")
      expect(usersService.login).toBeCalledTimes(1)
    });

    it('should return null when cannot find user', async () => {
      jest.spyOn(usersService, 'login').mockResolvedValue(null)
      const result = await service.validateUser("username", "password")
      expect(result).toBeNull()
    });

    it('should return a user', async () => {
      jest.spyOn(usersService, 'login').mockResolvedValue(userRO)
      jest.spyOn(service, 'createToken').mockReturnValue(confidential)
      const result = await service.validateUser("username", "password")
      expect(result).toEqual(userAuth);
    });
  });

  describe('createToken', () => {
    let result: { accessToken: string; expiresIn: number; }
    beforeEach(() => {
      jest.spyOn(jwtService, 'sign').mockReturnValue("token")
      result = service.createToken(userRO)
    })

    it('should call jwtService.sign', async () => {
      expect(jwtService.sign).toBeCalled()
    });

    it('should return a confidential', async () => {
      expect(result).toEqual(confidential);
    });
  });
});

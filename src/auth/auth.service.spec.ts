import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { UserAuth, UserRO } from '../users/dto/users.reponse';
import { UsersService } from '../users/users.service';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;
  let jwtService: JwtService;
  let usersService: UsersService;

  const user = new UserAuth()
  user.username = "username"
  user.name = "name"
  user.image = "image"
  user.accessToken = "token"
  user.expiresIn = 3600

  const userRO = new UserRO()
  userRO.username = "username"
  userRO.name = "name"
  userRO.image = "image"

  const confidential: { accessToken: string; expiresIn: number; } = {
    accessToken: "token",
    expiresIn: 3600
  }



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
      expect(result).toEqual(user);
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

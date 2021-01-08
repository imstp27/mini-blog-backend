import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ObjectID } from 'mongodb';
import { MongoRepository } from 'typeorm';
import { InputUser } from './dto/users.input';
import { UserRO } from './dto/users.reponse';
import { Users } from './models/users.model';
import { UsersService } from './users.service';
import * as bcrypt from 'bcrypt';

describe('UsersService', () => {
  let service: UsersService;
  let repository: MongoRepository<Users>;

  const _id = "507f1f77bcf86cd799439011"

  const input = new InputUser("username", "password")
  input.name = "name"
  input.image = "image"

  const user = new Users();
  user._id = new ObjectID(_id)
  user.username = input.username
  // user.password = "$2y$10$r5QG46KpG2XxVb95O2tOfuL21deVNXFXXiH7XzY6kGXcKAJnX1UCa"
  user.password = input.password
  user.name = input.name
  user.image = input.image

  const userRO = new UserRO();
  userRO._id = _id
  userRO.username = input.username
  userRO.name = input.name
  userRO.image = input.image

  let newuser: Users

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService, {
        provide: getRepositoryToken(Users),
        useValue: {
          findOne: jest.fn().mockResolvedValue(null),
          save: jest.fn(),
          find: jest.fn()
        },
      },],
    }).compile();

    service = module.get<UsersService>(UsersService);
    repository = module.get<MongoRepository<Users>>(getRepositoryToken(Users))
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findOne', () => {
    let result: UserRO
    beforeEach(async () => {
      jest.spyOn(repository, 'findOne').mockResolvedValue(user)
      result = await service.findOne("username")
    })

    it('should call repository.findOne', async () => {
      expect(repository.findOne).toBeCalled()
    });

    it('should return a user', async () => {
      expect(result).toEqual(userRO);
    });
  });

  describe('findOneByID', () => {
    let result: UserRO
    beforeEach(async () => {
      jest.spyOn(repository, 'findOne').mockResolvedValue(user)
      result = await service.findOneByID(new ObjectID(_id))
    })

    it('should call repository.findOne', async () => {
      expect(repository.findOne).toBeCalled()
    });

    it('should return a user', async () => {
      expect(result).toEqual(userRO);
    });
  });

  describe('findAll', () => {
    const output = [user]
    let result: Users[]
    beforeEach(async () => {
      jest.spyOn(repository, 'find').mockResolvedValue(output)
      result = await service.findAll()
    })

    it('should call repository.find once', async () => {
      expect(repository.find).toBeCalledTimes(1)
    });

    it('should return an array of users', async () => {
      expect(result).toEqual(output);
    });
  });

  describe('create', () => {
    let result: Users
    beforeEach(async () => {
      jest.spyOn(repository, 'save').mockResolvedValue(user)
      result = await service.create(input)
    })

    it('should call repository.save', async () => {
      expect(repository.save).toBeCalled()
    });

    it('should return a user', async () => {
      expect(result).toEqual(user);
    });
  });

  describe('login', () => {

    it('should retun null if cannot find a user', async () => {
      jest.spyOn(repository, 'findOne').mockResolvedValue(null)
      expect(await service.login("username", "password")).toBeNull()
    });

    it('should call repository.findOne', async () => {
      jest.spyOn(repository, 'findOne').mockResolvedValue(null)
      await service.login("username", "password")
      expect(repository.findOne).toBeCalled()
    });

    it('should retun null if password doesn\'t match', async () => {
      jest.spyOn(repository, 'findOne').mockResolvedValue(user)
      jest.spyOn(user, 'comparePassword').mockResolvedValue(false)
      expect(await service.login("username", "password")).toBeNull()
    });

    it('should call user.comparepassword', async () => {
      jest.spyOn(repository, 'findOne').mockResolvedValue(user)
      jest.spyOn(user, 'comparePassword').mockResolvedValue(false)
      await service.login("username", "password")
      expect(repository.findOne).toBeCalled()
    });

    it('should return a user', async () => {
      jest.spyOn(repository, 'findOne').mockResolvedValue(user)
      jest.spyOn(user, 'comparePassword').mockResolvedValue(true)
      expect(await service.login("username", "password")).toEqual(userRO);
    });
  });
});

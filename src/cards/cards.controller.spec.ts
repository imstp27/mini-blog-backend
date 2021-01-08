import { Test, TestingModule } from '@nestjs/testing';
import { UserRO } from '../users/dto/users.reponse';
import { ObjectID } from 'mongodb';
import { UsersService } from '../users/users.service';
import { CardsController } from './cards.controller';
import { CardsService } from './cards.service';
import { Cards } from './models/cards.model';
import { card, inputCard, _id } from '../utils/mock';

describe('Cards Controller', () => {
  let controller: CardsController;
  let service: CardsService;
  let usersService: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CardsController],
      providers: [{
        provide: CardsService,
        useValue: {
          findAll: jest.fn(),
          findByID: jest.fn(),
          create: jest.fn(),
          update: jest.fn(),
          deletebyID: jest.fn()
        }
      },
      {
        provide: UsersService,
        useValue: {
          findOneByID: jest.fn()
        }
      }]
    }).compile();

    controller = module.get<CardsController>(CardsController);
    service = module.get<CardsService>(CardsService);
    usersService = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('cards', () => {
    const input = [card, card]

    const user = new UserRO()
    user._id = _id

    const output = { ...card, author: user }

    let result: { author: UserRO; _id: ObjectID; name: string; status: string; content: string; category: string; createdOn: Date; updatedOn?: Date; }[];

    beforeEach(async () => {
      jest.spyOn(service, 'findAll').mockResolvedValue(input);
      jest.spyOn(usersService, 'findOneByID').mockResolvedValue(user);
      result = await controller.cards()
    })

    it('should call service.findAll once', async () => {
      expect(service.findAll).toBeCalledTimes(1)
    });

    it('should call usersService.findOneByID twice', async () => {
      expect(usersService.findOneByID).toBeCalledTimes(2)
    });


    it('should return an array of cards', async () => {
      expect(result).toEqual([output, output]);
    });
  });

  describe('cardByID', () => {
    let result: Cards

    beforeEach(async () => {
      jest.spyOn(service, 'findByID').mockResolvedValue(card);
      result = await controller.cardbyID(_id)
    })

    it('should call service.findByID once', async () => {
      expect(service.findByID).toBeCalledTimes(1)
    });

    it('should return an card', async () => {
      expect(result).toEqual(card);
    });
  });

  describe('create', () => {
    let result: Cards

    beforeEach(async () => {
      jest.spyOn(service, 'create').mockResolvedValue(card);
      result = await controller.create(inputCard, jest.mock)
    })

    it('should call service.create once', async () => {
      expect(service.create).toBeCalledTimes(1)
    });

    it('should return a card', async () => {
      expect(result).toEqual(card);
    });
  });

  describe('update', () => {
    let result: Cards

    beforeEach(async () => {
      jest.spyOn(service, 'update').mockResolvedValue(card);
      result = await controller.update(_id, inputCard, jest.mock)
    })

    it('should call service.update once', async () => {
      expect(service.update).toBeCalledTimes(1)
    });

    it('should return a card', async () => {
      expect(result).toEqual(card);
    });
  });

  describe('delete', () => {
    let result: Cards

    beforeEach(async () => {
      jest.spyOn(service, 'deletebyID').mockResolvedValue(card);
      result = await controller.delete(_id, jest.mock)
    })

    it('should call service.deletebyID once', async () => {
      expect(service.deletebyID).toBeCalledTimes(1)
    });

    it('should return a card', async () => {
      expect(result).toEqual(card);
    });
  });


});

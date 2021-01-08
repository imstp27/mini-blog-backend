import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ObjectID } from 'mongodb';
import { card, inputCard, _id } from '../utils/mock';
import { MongoRepository } from 'typeorm';
import { CardsService } from './cards.service';
import { InputCards } from './dto/cards.input';
import { Cards } from './models/cards.model';

describe('CardsService', () => {
  let service: CardsService;
  let repository: MongoRepository<Cards>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CardsService,
        {
          provide: getRepositoryToken(Cards),
          useValue: {
            find: jest.mock,
            findOne: jest.mock,
            save: jest.mock,
            findOneAndUpdate: jest.mock,
            findOneAndDelete: jest.mock
          },
        },],
    }).compile();

    service = module.get<CardsService>(CardsService);
    repository = module.get<MongoRepository<Cards>>(getRepositoryToken(Cards))
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    const output = [card, card]
    let result: Cards[]
    beforeEach(async () => {
      jest.spyOn(repository, 'find').mockResolvedValue(output);
      result = await service.findAll()
    })

    it('should call repository.find once', async () => {
      expect(repository.find).toBeCalledTimes(1)
    });

    it('should return an array of cards', async () => {
      expect(result).toEqual(output);
    });
  });

  describe('findByID', () => {
    let result: Cards
    beforeEach(async () => {
      jest.spyOn(repository, 'findOne').mockResolvedValue(card)
      result = await service.findByID(_id)
    })

    it('should call repository.find once', async () => {
      expect(repository.findOne).toBeCalledTimes(1)
    });

    it('should return a card', async () => {
      expect(result).toEqual(card);
    });
  });

  describe('create', () => {
    let result: Cards
    beforeEach(async () => {
      jest.spyOn(repository, 'save').mockResolvedValue(card)
      result = await service.create(inputCard, { user: { id: _id } })
    })

    it('should call repository.save once', async () => {
      expect(repository.save).toBeCalledTimes(1)
    });

    it('should return a card', async () => {
      expect(result).toEqual(card);
    });
  });

  describe('update', () => {
    let result: Cards
    beforeEach(async () => {
      jest.spyOn(repository, 'findOneAndUpdate').mockResolvedValue({ value: card })
      result = await service.update(_id, inputCard, { user: { id: _id } })
    })

    it('should call repository.findOneAndUpdate once', async () => {
      expect(repository.findOneAndUpdate).toBeCalledTimes(1)
    });

    it('should return a card', async () => {
      expect(result).toEqual(card);
    });
  });

  describe('deletebyID', () => {
    let result: Cards
    beforeEach(async () => {
      jest.spyOn(repository, 'findOneAndDelete').mockResolvedValue({ value: card })
      result = await service.deletebyID(_id, { user: { id: _id } })
    })

    it('should call repository.findOneAndDelete once', async () => {
      expect(repository.findOneAndDelete).toBeCalledTimes(1)
    });

    it('should return a card', async () => {
      expect(result).toEqual(card);
    });
  });
});

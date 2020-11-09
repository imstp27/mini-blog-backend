import { Injectable } from '@nestjs/common';
import { MongoRepository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Cards } from './models/cards.model';
import { InputCards } from './dto/cards.input';
import { ObjectID } from 'mongodb';

@Injectable()
export class CardsService {
  constructor(
    @InjectRepository(Cards)
    private readonly cardsRepository: MongoRepository<Cards>,
  ) { }

  async findAll(): Promise<Cards[] | null> {
    return this.cardsRepository.find({});
  }

  async findByID(_id: string): Promise<Cards | null> {
    return this.cardsRepository.findOne({ _id: new ObjectID(_id) });
  }

  async create(input: InputCards, context: any): Promise<Cards> {
    const card = new Cards();
    card.name = input.name
    card.status = input.status
    card.content = input.content
    card.category = input.category
    card.author = new ObjectID(context.user.id)
    return this.cardsRepository.save(card);
  }

  async update(_id: string, input: InputCards, context: any): Promise<Cards | null> {
    const card = await this.cardsRepository.findOneAndUpdate({ _id: new ObjectID(_id), author: new ObjectID(context.user.id) }, { $set: input }, { returnOriginal: false })
    return card?.value
  }

  async deletebyID(_id: string, context: any): Promise<Cards | null> {
    const card = await this.cardsRepository.findOneAndDelete({ _id: new ObjectID(_id), author: new ObjectID(context.user.id) })
    return card?.value
  }
}

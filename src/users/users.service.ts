import { Injectable } from '@nestjs/common';
import { MongoRepository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from './models/users.model';
import { InputUser } from './dto/users.input';
import { UserRO } from './dto/users.reponse';
import { ObjectID } from 'mongodb';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private readonly usersRepository: MongoRepository<Users>,
  ) {
    /* seed */
    usersRepository.findOne({ username: 'author' }).then((user) => {
      if (!user)
        this.create({
          username: 'author',
          password: 'sertistakehome',
          name: 'Im Sertis',
          image: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png'
        })
    })
  }

  async login(username: string, password: string): Promise<UserRO | null> {
    const user = await this.usersRepository.findOne({ username });
    if (!user) return null;

    const auth = await user.comparePassword(password);
    if (!auth) return null;

    return user.toResponseObject();
  }


  async findOne(username: string): Promise<UserRO | null> {
    return (await this.usersRepository.findOne({ username })).toResponseObject()
  }

  async findOneByID(_id: ObjectID): Promise<UserRO | null> {
    return (await this.usersRepository.findOne({ _id })).toResponseObject()
  }

  async findAll(): Promise<Users[] | null> {
    return this.usersRepository.find()
  }

  async create(input: InputUser): Promise<Users> {
    const user = new Users();
    user.username = input.username
    user.password = input.password
    user.name = input.name
    user.image = input.image
    return this.usersRepository.save(user);
  }
}

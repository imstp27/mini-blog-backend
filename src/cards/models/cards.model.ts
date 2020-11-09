import { Entity, Column, ObjectIdColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { ObjectID } from 'mongodb';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Cards {
  @ApiProperty({ description: 'card\'s id', example: '5fa8a9d6814d39001df6adef'})
  @ObjectIdColumn()
  _id: ObjectID

  @ApiProperty({ description: 'card\'s name', example: 'Card01'})
  @Column()
  name: string

  @ApiProperty({ description: 'card\'s status', example: 'new'})
  @Column()
  status: string

  @ApiProperty({ description: 'card\'s content', example: `Generally you'll want to use build-time environment variables to provide your configuration.`})
  @Column()
  content: string

  @ApiProperty({ description: 'card\'s category', example: 'chemistry'})
  @Column()
  category: string

  @ApiProperty({ description: 'card\'s author', example: {"_id":"5fa83ddb8531bf001d41003d","username":"author","name":"Im Sertis","image":"https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"}})
  @Column()
  author: ObjectID

  @ApiProperty({ description: 'creat date', example: '2020-11-09T02:30:46.527Z'})
  @CreateDateColumn()
  createdOn: Date

  @ApiProperty({ description: 'update date', example: '2020-11-09T02:30:46.527Z'})
  @UpdateDateColumn({ nullable: true })
  updatedOn?: Date
}
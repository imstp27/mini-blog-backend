import { Entity, Column, ObjectIdColumn, BeforeInsert, CreateDateColumn } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { UserRO } from '../dto/users.reponse';
import { ObjectID } from 'mongodb';

@Entity()
export class Users {
  @ObjectIdColumn()
  _id: ObjectID

  @Column({ unique: true, nullable: false })
  username: string

  @Column({ nullable: false })
  password: string

  @Column({ nullable: false })
  name: string

  @Column({ nullable: false })
  image: string

  @CreateDateColumn()
  createdOn?: Date

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }

  async comparePassword(attempt: string): Promise<boolean> {
    return await bcrypt.compare(attempt, this.password);
  }

  toResponseObject(): UserRO {
    const { _id, username, name, image } = this;
    const responseObject: UserRO = { _id: _id.toHexString(), username, name, image };

    return responseObject;
  }
}
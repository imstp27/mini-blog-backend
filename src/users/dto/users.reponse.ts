import { ApiProperty } from "@nestjs/swagger";

export class UserRO {
  @ApiProperty({ description: `user's id`, example: '5fa83ddb8531bf001d41003d' })
  _id: string;
  @ApiProperty({ description: 'username', example: 'author' })
  username: string;
  @ApiProperty({ description: `user's fullname`, example: 'Im Sertis' })
  name: string;
  @ApiProperty({ description: 'An image url for profile picture', example: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png' })
  image: string;
}

export class UserAuth extends UserRO {
  @ApiProperty({ description: `user's access token`, example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmYTgzZGRiODUzMWJmMDAxZDQxMDAzZCIsInVzZXJuYW1lIjoiYXV0aG9yIiwiaWF0IjoxNjA0ODg3ODY1LCJleHAiOjE2MDQ4OTE0NjV9.jfyeENjuJBy44MSnSI2-kPPP2kLaymACfaN1Bmc7tgE' })
  accessToken: string;
  @ApiProperty({ description: `access token expiration time`, example: 3600 })
  expiresIn: number;
}
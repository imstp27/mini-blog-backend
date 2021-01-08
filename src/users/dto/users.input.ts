import { ApiProperty } from "@nestjs/swagger"

export class InputUserAuth {
  @ApiProperty({ description: 'a username that use once register.', example: 'author' })
  username: string
  @ApiProperty({ description: 'a password that set once register.', example: 'sertistakehome' })
  password: string

  constructor(username: string, password: string) {
    this.username = username
    this.password = password
  }

}


export class InputUser extends InputUserAuth {
  @ApiProperty({ description: `user's fullname`, example: 'Im Sertis' })
  name: string
  @ApiProperty({ description: 'An image url for profile picture', example: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png' })
  image: string
}

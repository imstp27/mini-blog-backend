import { ApiProperty } from "@nestjs/swagger"

export class InputCards {
  @ApiProperty({ description: 'card\'s name', example: 'Card01' })
  name: string
  @ApiProperty({ description: 'card\'s status', example: 'new' })
  status: string
  @ApiProperty({ description: 'card\'s content', example: `Generally you'll want to use build-time environment variables to provide your configuration.` })
  content: string
  @ApiProperty({ description: 'card\'s category', example: 'chemistry' })
  category: string
}
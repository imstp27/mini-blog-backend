import { Controller, UseGuards, Get, Request, Param, Post, Body, Put, Delete } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { CardsService } from './cards.service';
import { AuthGuard } from '@nestjs/passport';
import { Cards } from './models/cards.model';
import { InputCards } from './dto/cards.input';
import { UsersService } from 'src/users/users.service';

@ApiTags('Cards')
@Controller('cards')
@ApiBearerAuth()
export class CardsController {
  constructor(private readonly cardsService: CardsService, private usersService: UsersService,) { }

  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ summary: "Get all cards." })
  @Get('all')
  @ApiResponse({ status: 200, description: 'Successful', type: [Cards] })
  async cards() {
    const cards = await this.cardsService.findAll()
    const result = await Promise.all(cards.map(async (card: Cards) => ({ ...card, author: await this.usersService.findOneByID(card.author) })))
    return result
  }

  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ summary: "Get a card by id." })
  @ApiParam({ name: 'id', type: String, description: 'ID of a card you want to get data.' })
  @Get(':id')
  @ApiResponse({ status: 200, description: 'Successful', type: Cards })
  async cardbyID(@Param('id') id: string) {
    return this.cardsService.findByID(id);
  }

  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ summary: "Add a new card." })
  @Post('new')
  @ApiResponse({ status: 201, description: 'Successful', type: Cards })
  async create(@Body() card: InputCards, @Request() req: any) {
    return this.cardsService.create(card, req);
  }

  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ summary: "Edit a card." })
  @ApiParam({ name: 'id', type: String, description: 'ID of a card you want to edit data.' })
  @Put(':id')
  @ApiResponse({ status: 201, description: 'Successful', type: Cards })
  async update(@Param('id') id: string, @Body() card: InputCards, @Request() req: any) {
    return this.cardsService.update(id, card, req);
  }

  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ summary: "Delete a card." })
  @ApiParam({ name: 'id', type: String, description: 'ID of a card you want to delete.' })
  @Delete(':id')
  @ApiResponse({ status: 201, description: 'Successful', type: Cards })
  async delete(@Param('id') id: string, @Request() req: any) {
    return this.cardsService.deletebyID(id, req);
  }
}

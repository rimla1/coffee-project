import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post, Res, Patch, Delete, Query } from '@nestjs/common';
import { CoffeesService } from './coffees.service';
import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { PaginationQueryDto } from './dto/pagination-query.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto';

@Controller('coffees')
export class CoffeesController {

    constructor(private readonly coffeesService: CoffeesService){

    }

    @Get()
    findAll(@Query() paginationQuery: PaginationQueryDto){
        const {limit, offset} = paginationQuery
        console.log(`Limit je: ${limit}, a offset je: ${offset}`)
        console.log("paginationQuery u controller-u je: ", paginationQuery)
        return this.coffeesService.findAll(paginationQuery)
    }


    @Get(":id")
    findOne(@Param('id') id: number){
        return this.coffeesService.findOne(id)
    }

    @Post()
    @HttpCode(HttpStatus.GONE)
    create(@Body() createCoffeeDto: CreateCoffeeDto){
        console.log(createCoffeeDto instanceof CreateCoffeeDto)
        return this.coffeesService.create(createCoffeeDto)
    }

    @Patch(":id")
    @HttpCode(HttpStatus.OK)
    update(@Param('id') id: string, @Body() updateCoffeeDto: UpdateCoffeeDto){
        return this.coffeesService.update(id, updateCoffeeDto)
    }

    @Delete(":id")
    @HttpCode(HttpStatus.OK)
    remove(@Param('id') id: string){
        return this.coffeesService.remove(id)
    }
}

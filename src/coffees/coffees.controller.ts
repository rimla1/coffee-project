import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post, Res, Patch, Delete, Query } from '@nestjs/common';
import { CoffeesService } from './coffees.service';
import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto';

@Controller('coffees')
export class CoffeesController {

    constructor(private readonly coffeesService: CoffeesService){

    }

    @Get()
    findAll(@Query() paginationQuery){
        // const {limit, offset} = paginationQuery
        return this.coffeesService.findAll()
    }

    @Get("chocolate")
    findChocolate(@Res() response){
        response.status(210).send("All the chocolate drinks")
    }

    @Get(":id")
    findOne(@Param('id') id: string){
        return this.coffeesService.findOne(id)
    }

    @Post()
    @HttpCode(HttpStatus.GONE)
    create(@Body() createCoffeeDto: CreateCoffeeDto){
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

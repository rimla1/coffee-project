import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post, Res, Patch, Delete, Query } from '@nestjs/common';
import { CoffeesService } from './coffees.service';

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
    create(@Body("price") price){
        return price
    }

    @Patch(":id")
    @HttpCode(HttpStatus.OK)
    update(@Param('id') id: string, @Body() body){
        return `Coffee with #${id} has updated with new values: ${body.name}`
    }

    @Delete(":id")
    @HttpCode(HttpStatus.OK)
    remove(@Param('id') id: string){
        return `Coffee with #${id} id has been removed!`
    }
}

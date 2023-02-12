import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post, Res, Patch } from '@nestjs/common';

@Controller('coffees')
export class CoffeesController {
    @Get()
    findAll(){
        return "List of all the coffees avaiable in our shop"
    }

    @Get("chocolate")
    findChocolate(@Res() response){
        response.status(210).send("All the chocolate drinks")
    }

    @Get(":id")
    getCoffeeById(@Param('id') id: string){
        return `You are searcing for a coffee with id #${id}`
    }

    @Post()
    @HttpCode(HttpStatus.GONE)
    create(@Body("price") price){
        return price
    }

    @Patch(":id")
    @HttpCode(HttpStatus.OK)
    update(@Param('id') id: string, @Body() body){
        return `User with #${id} has updated with new values: ${body.name}`
    }
}

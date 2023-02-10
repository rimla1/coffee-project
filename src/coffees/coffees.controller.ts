import { Controller, Get, Param } from '@nestjs/common';

@Controller('coffees')
export class CoffeesController {
    @Get()
    findAll(){
        return "List of all the coffees avaiable in our shop"
    }
    @Get("chocolate")
    findChocolate(){
        return "Hot dark chocolate, cold dark chocolate, hot white chocolate"
    }
    @Get(":id")
    getCoffeeById(@Param() params){
        return `You are searcing for a coffee with id #${params.id}`
    }
}

import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { Coffee } from './entities/coffee.entity';

@Injectable()
export class CoffeesService {
    private coffees: Coffee[] = [{
        id: 1,
        name: "Grand Kafa",
        brand: "C-Kafa",
        flavours: ["Vanilla", "Chocolate", "Banana"]
    },
    {
        id: 2,
        name: "Domaca Kafa",
        brand: "Turska",
        flavours: ["Gorka", "Slatka"]
    }]

    findAll() {
        return this.coffees;
      }

    findOne(id){
        const coffee = this.coffees.find(coffee => coffee.id === +id)
        if(!coffee){
            // throw new HttpException(`Coffee with #${id} id not found!`, HttpStatus.NOT_FOUND)
            throw new NotFoundException(`Coffee with #${id} id not found!`)
        }
        return coffee
    }

    create(createCoffeeData: any){
        this.coffees.push(createCoffeeData)
        return "Item added!"
    }

    update(id, updateCoffeeData){
        const existingCoffee = this.findOne(id)
        if(existingCoffee){
            return `You can update user because user exist!,`
        }
        return "User does not exist!"
    }

    remove(id){
        const coffeeIndex = this.coffees.findIndex(item => item.id === +id);
        if (coffeeIndex >= 0) {
          this.coffees.splice(coffeeIndex, 1);
        }
        return "Item deleted!"
    }
}

import { Injectable } from '@nestjs/common';
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

    
}

import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { PaginationQueryDto } from './dto/pagination-query.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto';
import { Coffee } from './entities/coffee.entity';
import { Flavour } from './entities/flavour.entity';

@Injectable()
export class CoffeesService {

    constructor(
        @InjectRepository(Coffee)
        private readonly coffeeRepository: Repository<Coffee>,
        @InjectRepository(Flavour)
        private readonly flavorRepository: Repository<Flavour>,
      ) {}

    findAll(paginationQuery: PaginationQueryDto) {
        console.log("paginationQuery u service-u je: ", paginationQuery)
        const {limit, offset} = paginationQuery
        return this.coffeeRepository.find({relations: {
          flavors: true,
        },
        skip: offset,
        take: limit
      });
      }

    async findOne(id: number){
        const coffee = await this.coffeeRepository.findOne({where: {id: id}, relations: {
          flavors: true,
        }})
        if(!coffee){
            // throw new HttpException(`Coffee with #${id} id not found!`, HttpStatus.NOT_FOUND)
            throw new NotFoundException(`Coffee with #${id} id not found!`)
        }
        return coffee
    }

    async create(createCoffeeDto: CreateCoffeeDto) {
      const flavors = await Promise.all(
        createCoffeeDto.flavours.map(name => this.preloadFlavorByName(name)),
      );
  
      const coffee = this.coffeeRepository.create({
        ...createCoffeeDto,
        flavors,
      });
      return this.coffeeRepository.save(coffee);
    }

    async update(id: string, updateCoffeeDto: UpdateCoffeeDto) {
      const flavors =
        updateCoffeeDto.flavours &&
        (await Promise.all(
          updateCoffeeDto.flavours.map(name => this.preloadFlavorByName(name)),
        ));
  
      const coffee = await this.coffeeRepository.preload({
        id: +id,
        ...updateCoffeeDto,
        flavors,
      });
      if (!coffee) {
        throw new NotFoundException(`Coffee #${id} not found`);
      }
      return this.coffeeRepository.save(coffee);
    }

      async remove(id: string) {
        const coffee = await this.findOne(+id);
        return this.coffeeRepository.remove(coffee);
      }


      private async preloadFlavorByName(name: string): Promise<Flavour> {
        const existingFlavor = await this.flavorRepository.findOne({ where: { name } }); // 👈 notice the "where"
        if (existingFlavor) {
          return existingFlavor;
        }
        return this.flavorRepository.create({ name });
      }

}

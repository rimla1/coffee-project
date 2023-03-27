import { CoffeeRefactor1679917539436 } from "src/migrations/1679917539436-CoffeeRefactor";
import { DataSource } from "typeorm";

export default new DataSource({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'almirmuminovic',
    password: 'pass123',
    database: 'postgres',
    entities: [],
    migrations: [CoffeeRefactor1679917539436],
  });
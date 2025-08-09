import { DataSource } from 'typeorm';
import { Task } from './entity/task.entity';
import * as dotenv from 'dotenv';

dotenv.config();

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DATABASE_HOST || 'localhost',
  port: Number(process.env.DATABASE_PORT) || 5432,
  username: process.env.DATABASE_USER ,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME || 'taskdb',
  entities: [Task],
  migrations: ['src/migrations/*.ts'],
  synchronize: false, // important to disable for migrations
  logging: false,
});

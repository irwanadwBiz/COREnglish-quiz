import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from '../entity/task.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepo: Repository<Task>,
  ) {}

  async create(task: Partial<Task>) {
    try {
      // Validation: Cannot duplicate same title (Case-Sensitive)
      const existTask = await this.taskRepo.findOne({
        where: { title: task.title },
      });
      if (existTask) {
        throw new BadRequestException('Task with this title already exists!');
      }

      const newTask = this.taskRepo.create(task);

      return this.taskRepo.save(newTask);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async findAll({
    status,
    page = 1,
    limit = 10,
  }: {
    status?: string;
    page?: number;
    limit?: number;
  } = {}) {
    try {
      const [items, total] = await this.taskRepo.findAndCount({
        where: status ? { status: status as Task['status'] } : undefined,
        skip: (page - 1) * limit,
        take: limit,
      });

      return { data: items, total, page, limit };
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async findOne(id: string) {
    try {
      return this.taskRepo.findOneBy({ id });
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async update(id: string, data: Partial<Task>) {
    try {
      // Validation: Cannot duplicate same title (Case-Sensitive)
      const existTask = await this.taskRepo.findOneBy({ id });
      if (!existTask) {
        throw new NotFoundException(`Task with id ${id} not found`);
      }

      return this.taskRepo.update(id, data);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async remove(id: string) {
    try {
      const existTask = await this.taskRepo.findOneBy({ id });
      if (!existTask) {
        throw new NotFoundException(`Task with id ${id} already deleted`);
      }

      return this.taskRepo.delete(id);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}

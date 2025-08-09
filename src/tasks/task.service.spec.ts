import { Test, TestingModule } from '@nestjs/testing';
import { TasksService } from './tasks.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Task } from '../entity/task.entity';
import { Repository } from 'typeorm';
import { BadRequestException, NotFoundException } from '@nestjs/common';

describe('TasksService', () => {
  let service: TasksService;
  let repo: Repository<Task>;

  const mockTask = { id: '1', title: 'Test Task', description: 'Desc' } as Task;

  const mockRepo = {
    find: jest.fn(),
    findOne: jest.fn(),
    findOneBy: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
    findAndCount: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TasksService,
        {
          provide: getRepositoryToken(Task),
          useValue: mockRepo,
        },
      ],
    }).compile();

    service = module.get<TasksService>(TasksService);
    repo = module.get(getRepositoryToken(Task));
  });

  it('should create a task', async () => {
    mockRepo.findOne.mockResolvedValue(null);
    mockRepo.create.mockReturnValue(mockTask);
    mockRepo.save.mockResolvedValue(mockTask);

    const result = await service.create({ title: 'Test Task' });
    expect(result).toEqual(mockTask);
    expect(mockRepo.save).toHaveBeenCalledWith(mockTask);
  });

  it('should throw if creating a duplicate title', async () => {
    mockRepo.findOne.mockResolvedValue(mockTask);
    await expect(service.create({ title: 'Test Task' })).rejects.toThrow(
      BadRequestException,
    );
  });

  it('should find all tasks', async () => {
    const tasks = [{ id: '1', title: 'Test Task' }];
    mockRepo.findAndCount.mockResolvedValue([tasks, 1]);

    const result = await service.findAll();

    expect(result).toEqual({
      data: tasks,
      total: 1,
      page: 1,
      limit: 10,
    });
  });

  it('should update an existing task', async () => {
    mockRepo.findOneBy.mockResolvedValue(mockTask);
    mockRepo.update.mockResolvedValue({ affected: 1 });

    const result = await service.update('1', { title: 'Updated' });
    expect(mockRepo.update).toHaveBeenCalledWith('1', { title: 'Updated' });
  });

  it('should throw if updating non-existing task', async () => {
    mockRepo.findOneBy.mockResolvedValue(null);
    await expect(service.update('1', {})).rejects.toThrow(NotFoundException);
  });

  it('should delete an existing task', async () => {
    mockRepo.findOneBy.mockResolvedValue(mockTask);
    mockRepo.delete.mockResolvedValue({ affected: 1 });

    const result = await service.remove('1');
    expect(mockRepo.delete).toHaveBeenCalledWith('1');
  });

  it('should throw if deleting non-existing task', async () => {
    mockRepo.findOneBy.mockResolvedValue(null);
    await expect(service.remove('1')).rejects.toThrow(NotFoundException);
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { getConnection } from 'typeorm';

describe('TasksController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
    await app.init();
  });

  afterAll(async () => {
    await getConnection().close();
    await app.close();
  });

  let createdTaskId: string;

  it('/tasks (POST) → create a task', async () => {
    const res = await request(app.getHttpServer())
      .post('/tasks')
      .send({ title: 'E2E Task', description: 'Test Desc' })
      .expect(201);

    createdTaskId = res.body.id;
    expect(res.body.title).toBe('E2E Task');
  });

  it('/tasks (GET) → get all tasks', async () => {
    const res = await request(app.getHttpServer()).get('/tasks').expect(200);

    expect(Array.isArray(res.body)).toBe(true);
  });

  it('/tasks/:id (GET) → get one task', async () => {
    const res = await request(app.getHttpServer())
      .get(`/tasks/${createdTaskId}`)
      .expect(200);

    expect(res.body.id).toBe(createdTaskId);
  });

  it('/tasks/:id (PATCH) → update a task', async () => {
    const res = await request(app.getHttpServer())
      .patch(`/tasks/${createdTaskId}`)
      .send({ title: 'Updated E2E Task' })
      .expect(200);

    expect(res.body).toBeDefined();
  });

  it('/tasks/:id (DELETE) → delete a task', async () => {
    await request(app.getHttpServer())
      .delete(`/tasks/${createdTaskId}`)
      .expect(204);
  });

  it('/tasks/:id (GET) → should return 404 after delete', async () => {
    await request(app.getHttpServer())
      .get(`/tasks/${createdTaskId}`)
      .expect(404);
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET)', async () => {
    const res = await request(app.getHttpServer()).get('/');
    expect(res.status).toBe(200);
    expect(res.body).toEqual({});
    expect(res.text).toEqual('Hello World!');
  });

  it('/messages/:id (POST)', async () => {
    const payload = { content: 'Hello World!' };
    const res = await request(app.getHttpServer())
      .post('/messages/10')
      .set('Accept', 'application/json')
      .send(payload);
    expect(res.status).toBe(201);
    expect(res.body).toEqual(payload);
    expect(res.text).toEqual(JSON.stringify(payload));
  });
});

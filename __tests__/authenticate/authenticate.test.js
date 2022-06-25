const request = require('supertest');
const app = require('../../src/app');
const Person = require('../../src/app/models/Person');

const personPost = {
  name: 'João da Silva',
  cpf: '19384723061',
  birthDay: '10/08/2001',
  email: 'joaoSilva3@email.com',
  password: '123456',
  canDrive: 'yes'
};

describe('Person route test', () => {
  beforeEach(async () => {
    await Person.deleteMany();
  });

  it('Authenticate a person', async () => {
    await request(app).post('/api/v1/person').send(personPost);
    const aut = await request(app).post(`/api/v1/authenticate`).send({
      email: personPost.email,
      password: personPost.password
    });
    expect(aut.status).toBe(200);
  });
  it('Authenticate a person with error', async () => {
    await request(app).post('/api/v1/person').send(personPost);
    const aut = await request(app).post(`/api/v1/authenticate`).send({
      email: personPost.email,
      password: '123457'
    });
    expect(aut.status).toBe(400);
  });
  it('Authenticate a person with error', async () => {
    await request(app).post('/api/v1/person').send(personPost);
    const aut = await request(app).post(`/api/v1/authenticate`).send({
      email: 'joaoSilva3email.com',
      password: '123456'
    });
    expect(aut.status).toBe(400);
  });
});

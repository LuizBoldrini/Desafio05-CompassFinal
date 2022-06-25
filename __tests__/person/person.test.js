const request = require('supertest');
const app = require('../../src/app');
const Person = require('../../src/app/models/Person');

describe('Person route test', () => {
  beforeEach(async () => {
    await Person.deleteMany();
  });

  it('Create a person and register in the database', async () => {
    const personPost = await request(app).post('/api/v1/person').send({
      name: 'João da Silva',
      cpf: '88943098006',
      birthDay: '10/08/2001',
      email: 'joaoSilva@email.com',
      password: '123456',
      canDrive: 'yes'
    });
    expect(personPost.statusCode).toBe(201);
  });
  it('Returning error in name', async () => {
    const personPost = await request(app).post('/api/v1/person').send({
      name: 'J',
      cpf: '88943098006',
      birthDay: '10/08/2001',
      email: 'joaoSilva@email.com',
      password: '123456',
      canDrive: 'yes'
    });
    expect(personPost.statusCode).toBe(400);
  });
  it('Returning error in cpf', async () => {
    const personPost = await request(app).post('/api/v1/person').send({
      name: 'João da Silva',
      cpf: '8894309801',
      birthDay: '10/08/2001',
      email: 'joaoSilva@email.com',
      password: '123456',
      canDrive: 'yes'
    });
    expect(personPost.statusCode).toBe(400);
  });
  it('Returning error in birthDay', async () => {
    const personPost = await request(app).post('/api/v1/person').send({
      name: 'João da Silva',
      cpf: '88943098006',
      birthDay: '10/08/2008',
      email: 'joaoSilva@email.com',
      password: '123456',
      canDrive: 'yes'
    });
    expect(personPost.statusCode).toBe(400);
  });
  it('Returning error in email', async () => {
    const personPost = await request(app).post('/api/v1/person').send({
      name: 'João da Silva',
      cpf: '88943098006',
      birthDay: '10/08/2008',
      email: 'joaoSilvaemail.com',
      password: '123456',
      canDrive: 'yes'
    });
    expect(personPost.statusCode).toBe(400);
  });
  it('Returning error in password', async () => {
    const personPost = await request(app).post('/api/v1/person').send({
      name: 'João da Silva',
      cpf: '88943098006',
      birthDay: '10/08/2008',
      email: 'joaoSilva@email.com',
      password: '12345',
      canDrive: 'yes'
    });
    expect(personPost.statusCode).toBe(400);
  });
  it('Returning error in canDrive', async () => {
    const personPost = await request(app).post('/api/v1/person').send({
      name: 'João da Silva',
      cpf: '88943098006',
      birthDay: '10/08/2000',
      email: 'joaoSilva@email.com',
      password: '123456',
      canDrive: 'yess'
    });
    expect(personPost.statusCode).toBe(400);
  });

  it('Returns all person', async () => {
    const personGet = await request(app).get('/api/v1/person').send();
    expect(personGet.status).toBe(200);
  });
  it('Returns all people with with error', async () => {
    const personGet = await request(app).get('/api/v1/person').send({
      name: 'João da Silva',
      cpf: '88943098006',
      birthDay: '10/08/2008',
      email: 'joaoSilva@email.com',
      password: '123456',
      canDrive: 'yess'
    });
    expect(personGet.status).toBe(400);
  });

  it('Returns a person by id', async () => {
    const person = await request(app).post('/api/v1/person').send({
      name: 'João da Silva',
      cpf: '88943098006',
      birthDay: '10/08/2001',
      email: 'joaoSilva@email.com',
      password: '123456',
      canDrive: 'yes'
    });
    const people = await request(app).get(`/api/v1/person/${person.body._id}`).send();
    expect(people.status).toBe(200);
  });
  it('Returns a person by id with error ', async () => {
    const person = await request(app).post('/api/v1/person').send({
      name: 'João da Silva',
      cpf: '8894309800',
      birthDay: '10/08/2001',
      email: 'joaoSilva@email.com',
      password: '123456',
      canDrive: 'yes'
    });
    const people = await request(app).get(`/api/v1/person/${person.body._id}`).send();
    expect(people.status).toBe(400);
  });

  it('Updating a person', async () => {
    const person = await request(app).post('/api/v1/person').send({
      name: 'João da Silva',
      cpf: '88943098006',
      birthDay: '10/08/2001',
      email: 'joaoSilva@email.com',
      password: '123456',
      canDrive: 'yes'
    });
    const updatePerson = await request(app).put(`/api/v1/person/${person.body._id}`).send({
      name: 'João da Silva Neto'
    });
    expect(updatePerson.status).toBe(200);
  });
  it('Updating a person with error', async () => {
    const person = await request(app).post('/api/v1/person').send({
      name: 'João da Silva',
      cpf: '88943098006',
      birthDay: '10/08/2001',
      email: 'joaoSilva@email.com',
      password: '123456',
      canDrive: 'yes'
    });
    const updatePerson = await request(app).put(`/api/v1/person/${person.body._id}`).send({
      name: 'J'
    });
    expect(updatePerson.status).toBe(400);
  });
  it('Updating a person by id with non-standard id error', async () => {
    await request(app).post('/api/v1/person').send({
      name: 'João da Silva',
      cpf: '88943098006',
      birthDay: '10/08/2001',
      email: 'joaoSilva@email.com',
      password: '123456',
      canDrive: 'yes'
    });
    const id = '62b25ffae2f0ef696a7ba37';
    const people = await request(app).put(`/api/v1/person/${id}`).send();
    expect(people.status).toBe(400);
  });

  it('Delete a person by id', async () => {
    const person = await request(app).post('/api/v1/person').send({
      name: 'João da Silva',
      cpf: '88943098006',
      birthDay: '10/08/2001',
      email: 'joaoSilva@email.com',
      password: '123456',
      canDrive: 'yes'
    });
    const people = await request(app).delete(`/api/v1/person/${person.body._id}`).send();
    expect(people.status).toBe(200);
  });
  it('Delete a person by id with error of not found', async () => {
    await request(app).post('/api/v1/person').send({
      name: 'João da Silva',
      cpf: '88943098006',
      birthDay: '10/08/2001',
      email: 'joaoSilva@email.com',
      password: '123456',
      canDrive: 'yes'
    });
    const id = '62b25ffae2f0ef696a7ba37d';
    const people = await request(app).delete(`/api/v1/person/${id}`).send();
    expect(people.status).toBe(400);
  });
  it('Delete a person by id with non-standard id error', async () => {
    await request(app).post('/api/v1/person').send({
      name: 'João da Silva',
      cpf: '88943098006',
      birthDay: '10/08/2001',
      email: 'joaoSilva@email.com',
      password: '123456',
      canDrive: 'yes'
    });
    const id = '62b25ffae2f0ef696a7ba37';
    const people = await request(app).delete(`/api/v1/person/${id}`).send({
      name: 'João Neto da Silva'
    });
    expect(people.status).toBe(400);
  });
});

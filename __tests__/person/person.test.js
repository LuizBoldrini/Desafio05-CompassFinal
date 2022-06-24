const request = require('supertest');
const app = require('../../src/app');
const Person = require('../../src/app/models/Person');

beforeAll(async () => {
  await Person.deleteMany();
});
beforeEach(async () => {
  await Person.deleteMany();
});

const person = {
  name: 'João da Silva',
  cpf: '21120038014',
  birthDay: '10/10/2003',
  email: 'joazinho@email.com',
  password: '123457',
  canDrive: 'yes'
};

describe('Create a new person', () => {
  it('should create a person and return status 201', async () => {
    const Person = person;
    const response = await request(app).post('/api/v1/person').send(Person);
    expect(response.statusCode).toBe(201);
  });
});

describe('Get all people', () => {
  it('should return status code 200', async () => {
    const Person = person;
    await request(app).post('/api/v1/person').send(Person);
    const response = await request(app).get('/api/v1/person');
    expect(response.statusCode).toBe(200);
  });
});

describe('Get person by id', () => {
  it('should get person by Id, returning a status of 200', async () => {
    const Person = person;
    const { text } = await request(app).post('/api/v1/person/').send(Person);
    const { _id } = JSON.parse(text);
    const response = await request(app).get(`/api/v1/person/${_id.toString()}`);
    expect(response.statusCode).toBe(200);
  });
});

describe('Delete person by id', () => {
  it('should delete person by Id', async () => {
    const Person = person;
    const { text } = await request(app).post('/api/v1/person/').send(Person);
    const { _id } = JSON.parse(text);
    const response = await request(app).delete(`/api/v1/person/${_id.toString()}`);
    expect(response.statusCode).toBe(204);
  });
});

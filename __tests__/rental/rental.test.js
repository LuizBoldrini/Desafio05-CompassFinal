const request = require('supertest');
const app = require('../../src/app');
const Rental = require('../../src/app/models/Rental');

beforeAll(async () => {
  await Rental.deleteMany();
});
beforeEach(async () => {
  await Rental.deleteMany();
});

describe('Create a new rental', () => {
  it('should create a rental and return status 201', async () => {
    const rental = {
      name: 'Localiza Rent a Car',
      cnpj: '64.646.687/0001-10',
      activities: 'vender',
      address: [
        {
          zipCode: '96200-200',
          number: '232',
          isFilial: false
        }
      ]
    };
    const response = await request(app).post('/api/v1/rental').send(rental);
    expect(response.statusCode).toBe(201);
  });
});

describe('List a rental', () => {
  it('must create a rental and list it returning a status of 200', async () => {
    const rental = {
      name: 'Localiza Rent a Car',
      cnpj: '64.646.687/0001-10',
      activities: 'vender',
      address: [
        {
          zipCode: '96200-200',
          number: '232',
          isFilial: false
        }
      ]
    };
    await request(app).post('/api/v1/rental').send(rental);
    const response = await request(app).get('/api/v1/rental');
    expect(response.statusCode).toBe(200);
  });
});

describe('Get rental ID', () => {
  it('hould get rental by Id, returning a status of 200', async () => {
    const rental = {
      name: 'Localiza Rent a Car',
      cnpj: '64.646.687/0001-10',
      activities: 'vender',
      address: [
        {
          zipCode: '96200-200',
          number: '232',
          isFilial: false
        }
      ]
    };
    const { text } = await request(app).post('/api/v1/rental').send(rental);
    const { _id } = JSON.parse(text);
    const response = await request(app).get(`/api/v1/rental/${_id.toString()}`);
    expect(response.statusCode).toBe(200);
  });
});

describe('Get rental ID and remove', () => {
  it('should delete rental by ID, returning status of 204', async () => {
    const rental = {
      name: 'Localiza Rent a Car',
      cnpj: '64.646.687/0001-10',
      activities: 'vender',
      address: [
        {
          zipCode: '96200-200',
          number: '232',
          isFilial: false
        }
      ]
    };
    const { text } = await request(app).post('/api/v1/rental').send(rental);
    const { _id } = JSON.parse(text);
    const response = await request(app).delete(`/api/v1/rental/${_id.toString()}`);
    expect(response.statusCode).toBe(204);
  });
});

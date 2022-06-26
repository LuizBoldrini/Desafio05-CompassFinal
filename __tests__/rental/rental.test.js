const request = require('supertest');
const app = require('../../src/app');
const Rental = require('../../src/app/models/Rental');

describe('Person route test', () => {
  beforeEach(async () => {
    await Rental.deleteMany();
  });

  it('Create a rental and register in the database', async () => {
    const rentalPost = await request(app)
      .post('/api/v1/rental')
      .send({
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
      });
    expect(rentalPost.statusCode).toBe(201);
  });
  it('Created rental with two isFilial false', async () => {
    const rentalPost = await request(app)
      .post('/api/v1/rental')
      .send({
        name: 'Localiza Rent a Car',
        cnpj: '64.646.687/0001-10',
        activities: 'vender',
        address: [
          {
            zipCode: '96200-200',
            number: '2323',
            isFilial: false
          },
          {
            zipCode: '76973-000',
            number: '2321',
            isFilial: false
          }
        ]
      });
    expect(rentalPost.statusCode).toBe(400);
  });
  it('Returning error in name', async () => {
    const personPost = await request(app)
      .post('/api/v1/rental')
      .send({
        name: '',
        cnpj: '64.646.687/0001-10',
        activities: 'vender',
        address: [
          {
            zipCode: '96200-200',
            number: '232',
            isFilial: false
          }
        ]
      });
    expect(personPost.statusCode).toBe(400);
  });

  it('Returns all rental', async () => {
    const rentalGet = await request(app).get('/api/v1/rental').send();
    expect(rentalGet.status).toBe(200);
  });
  it('Returns all rental with with error', async () => {
    const rentalGet = await request(app)
      .get('/api/v1/rental')
      .send({
        name: 'Localiza Rent a Car',
        cnpj: '64.646.687/0001-1',
        activities: 'vender',
        address: [
          {
            zipCode: '96200-200',
            number: '232',
            isFilial: false
          }
        ]
      });
    expect(rentalGet.status).toBe(400);
  });

  it('Returns a rental by id', async () => {
    const rental = await request(app)
      .post('/api/v1/rental')
      .send({
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
      });
    const rentalGet = await request(app).get(`/api/v1/rental/${rental.body._id}`).send();
    expect(rentalGet.status).toBe(200);
  });
  it('Returns a rental by id with error ', async () => {
    const rental = await request(app)
      .post('/api/v1/rental')
      .send({
        name: 'Localiza Rent a Car',
        cnpj: '64.646.687/0001-1',
        activities: 'vender',
        address: [
          {
            zipCode: '96200-200',
            number: '232',
            isFilial: false
          }
        ]
      });
    const rentalGet = await request(app).get(`/api/v1/rental/${rental.body._id}`).send();
    expect(rentalGet.status).toBe(400);
  });
  it('Returns a rental by id with error NotFound', async () => {
    await request(app)
      .post('/api/v1/rental')
      .send({
        name: 'Localiza Rent a Car',
        cnpj: '64.646.687/0001-1',
        activities: 'vender',
        address: [
          {
            zipCode: '96200-200',
            number: '232',
            isFilial: false
          }
        ]
      });
    const id = '62b25ffae2f0ef696a7ba37d';
    const rentalGet = await request(app).get(`/api/v1/rental/${id}`).send();
    expect(rentalGet.status).toBe(404);
  });

  it('Updating a rental', async () => {
    const rental = await request(app)
      .post('/api/v1/rental')
      .send({
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
      });
    const updateRental = await request(app).put(`/api/v1/rental/${rental.body._id}`).send({
      name: 'LocaFácil: Carros de qualidade'
    });
    expect(updateRental.status).toBe(200);
  });
  it('Updating a rental', async () => {
    const rental = await request(app)
      .post('/api/v1/rental')
      .send({
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
      });
    const updateRental = await request(app).put(`/api/v1/rental/${rental.body._id}`).send({
      name: ''
    });
    expect(updateRental.status).toBe(400);
  });

  it('Delete a rental by id', async () => {
    const rental = await request(app)
      .post('/api/v1/rental')
      .send({
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
      });
    const rentalGet = await request(app).delete(`/api/v1/rental/${rental.body._id}`).send();
    expect(rentalGet.status).toBe(200);
  });
  it('Delete a rental by id with error', async () => {
    await request(app).post('/api/v1/rental').send({
      name: 'João da Silva',
      cpf: '88943098006',
      birthDay: '10/08/2001',
      email: 'joaoSilva@email.com',
      password: '123456',
      canDrive: 'yes'
    });
    const id = '62b25ffae2f0ef696a7ba37d2';
    const rentalGet = await request(app).delete(`/api/v1/rental/${id}`).send();
    expect(rentalGet.status).toBe(400);
  });
});

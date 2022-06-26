const request = require('supertest');
const app = require('../../src/app');

let id_user;
let token;
let id_rental;
let id_car;
let fleet;

beforeEach(async () => {
  const personPost = {
    name: 'João da Silva',
    cpf: '49014329075',
    birthDay: '10/08/2001',
    email: 'joaoSilva2@email.com',
    password: '123456',
    canDrive: 'yes'
  };
  const personCreate = await request(app).post('/api/v1/person').send(personPost);
  id_user = personCreate.body.id;

  const autPost = await request(app)
    .post(`/api/v1/authenticate`)
    .send({ email: personPost.email, password: personPost.password });
  token = autPost.body.token;

  const rentalPost = {
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
  const rentalCreate = await request(app).post('/api/v1/rental').send(rentalPost);
  id_rental = rentalCreate.body.id;

  const carPost = {
    model: 'S10 3.0',
    type: 'sedan',
    brand: 'GM',
    color: 'prata',
    year: '2003',
    accessories: [
      {
        description: 'Gabine dupla'
      },
      {
        description: 'Dir. Hidráulica'
      }
    ],
    passengersQtd: 6
  };
  const carCreate = await request(app).post('/api/v1/car').set('Authorization', `Bearer ${token}`).send(carPost);
  id_car = carCreate.body.id;
});

describe('Test on the fleet route', () => {
  it('Create a fleet and register in the database', async () => {
    const { status } = await request(app)
      .post(`/api/v1/rental/${id_rental}/fleet`)
      .send({
        id_car: `${id_car}`,
        status: 'available',
        daily_value: 100,
        plate: 'TYU0987'
      });
    expect(status).toBe(201);
    it('Create a fleet and register in the database error', async () => {
      const { status } = await request(app)
        .post(`/api/v1/rental/${id_rental}/fleet`)
        .send({
          id_car: `${id_car}`,
          status: 'availables',
          daily_value: 100,
          plate: 'TYU0987'
        });
      expect(status).toBe(400);
    });
  });
});

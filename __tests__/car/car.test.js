/* eslint-disable prettier/prettier */
const request = require('supertest');
const app = require('../../src/app');
const Person = require('../../src/app/models/Person');
const Car = require('../../src/app/models/Car');

beforeEach(async () => {
  await Car.deleteMany();
});
beforeEach(async () => {
  await Person.deleteMany();
});
const personPost = {
  name: 'João da Silva',
  cpf: '49014329075',
  birthDay: '10/08/2001',
  email: 'joaoSilva2@email.com',
  password: '123456',
  canDrive: 'yes'
};

const car = {
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

let token = '';

describe('Test on the car route', () => {
  beforeEach(async () => {
    await request(app).post('/api/v1/person').send(personPost);
    const result = await request(app)
      .post(`/api/v1/authenticate`)
      .send({ email: personPost.email, password: personPost.password });
    const { body } = result;
    token = body.token;
  });

  it('Create a car and register in the database', async () => {
    const { status } = await request(app).post('/api/v1/car').set('Authorization', `Bearer ${token}`).send(car);
    expect(status).toBe(201);
  });
  it('Create a car error ', async () => {
    const { status } = await request(app)
      .post('/api/v1/car')
      .set('Authorization', `Bearer ${token}`)
      .send({
        model: 'S10 3.0',
        type: 'sedan',
        brand: 'GM',
        color: 'prata',
        year: '2024',
        accessories: [
          {
            description: 'Gabine dupla'
          },
          {
            description: 'Dir. Hidráulica'
          }
        ],
        passengersQtd: 6
      });
    expect(status).toBe(400);
  });

  it('Returns all car', async () => {
    const { status } = await request(app).get('/api/v1/car').set('Authorization', `Bearer ${token}`).send();
    expect(status).toBe(200);
  });
  it('Returns all car with with error ', async () => {
    const { status } = await request(app)
      .post('/api/v1/car')
      .set('Authorization', `Bearer ${token}`)
      .send({
        model: '',
        type: 'sedan',
        brand: 'GM',
        color: 'prata',
        year: '2024',
        accessories: [
          {
            description: 'Gabine dupla'
          },
          {
            description: 'Dir. Hidráulica'
          }
        ],
        passengersQtd: 6
      });
    expect(status).toBe(400);
  });
  it('Change a car update error', async () => {
    const carPost = await request(app).post('/api/v1/car').set('Authorization', `Bearer ${token}`).send(car);
    const { status } = await request(app)
      .get(`/api/v1/car/${carPost.body._id}`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        year: '2028'
      });
    expect(status).toBe(400);
  });

  it('Returns a person by id', async () => {
    const carPost = await request(app).post('/api/v1/car').set('Authorization', `Bearer ${token}`).send(car);
    const { status } = await request(app)
      .get(`/api/v1/car/${carPost.body._id}`)
      .set('Authorization', `Bearer ${token}`)
      .send();
    expect(status).toBe(200);
  });
  it('Returns a car with NotFound error', async () => {
    await request(app).post('/api/v1/car').set('Authorization', `Bearer ${token}`).send(car);
    const id = '62b7688af845c5805331bbde';
    const { status } = await request(app).get(`/api/v1/car/${id}`).set('Authorization', `Bearer ${token}`).send();
    expect(status).toBe(404);
  });
  it('Returns a car with error', async () => {
    await request(app).post('/api/v1/car').set('Authorization', `Bearer ${token}`).send(car);
    const id = '62b25ffae2f0ef696a7ba37';
    const { status } = await request(app).get(`/api/v1/car/${id}`).set('Authorization', `Bearer ${token}`).send();
    expect(status).toBe(400);
  });

  it('Change a car update', async () => {
    const carPost = await request(app).post('/api/v1/car').set('Authorization', `Bearer ${token}`).send(car);
    const { status } = await request(app)
      .put(`/api/v1/car/${carPost.body._id}`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        year: '2000'
      });
    expect(status).toBe(200);
  });
  it('Change a car update error', async () => {
    const carPost = await request(app).post('/api/v1/car').set('Authorization', `Bearer ${token}`).send(car);
    const { status } = await request(app)
      .put(`/api/v1/car/${carPost.body._id}`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        year: '2028'
      });
    expect(status).toBe(400);
  });
  it('Returns a car with NotFound error', async () => {
    await request(app).post('/api/v1/car').set('Authorization', `Bearer ${token}`).send(car);
    const id = '62b7688af845c5805331bbde';
    const { status } = await request(app).put(`/api/v1/car/${id}`).set('Authorization', `Bearer ${token}`).send();
    expect(status).toBe(404);
  });
  it('Returns a car with BadRequest error', async () => {
    await request(app).post('/api/v1/car').set('Authorization', `Bearer ${token}`).send(car);
    const id = '62b7688af845c5805331bbd';
    const { status } = await request(app).put(`/api/v1/car/${id}`).set('Authorization', `Bearer ${token}`).send();
    expect(status).toBe(400);
  });

  it('Change a car delete', async () => {
    const carPost = await request(app).post('/api/v1/car').set('Authorization', `Bearer ${token}`).send(car);
    const { status } = await request(app)
      .delete(`/api/v1/car/${carPost.body._id}`)
      .set('Authorization', `Bearer ${token}`)
      .send();
    expect(status).toBe(204);
  });
  it('Returns a car with NotFound error', async () => {
    await request(app).post('/api/v1/car').set('Authorization', `Bearer ${token}`).send(car);
    const id = '62b7688af845c5805331bbde';
    const { status } = await request(app).delete(`/api/v1/car/${id}`).set('Authorization', `Bearer ${token}`).send();
    expect(status).toBe(404);
  });
  it('Returns a car with BadRequest error', async () => {
    await request(app).post('/api/v1/car').set('Authorization', `Bearer ${token}`).send(car);
    const id = '62b7688af845c5805331bbd';
    const { status } = await request(app).delete(`/api/v1/car/${id}`).set('Authorization', `Bearer ${token}`).send();
    expect(status).toBe(400);
  });

  it('Change a car update acessory', async () => {
    const carPost = await request(app).post('/api/v1/car').set('Authorization', `Bearer ${token}`).send(car);
    const { status } = await request(app)
      .patch(`/api/v1/car/${carPost.body._id}/acessorios/${carPost.body.idAcess}`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        description: 'Ar-condicionado'
      });
    expect(status).toBe(400);
  });
  it('Change a car update acessory error', async () => {
    const carPost = await request(app).post('/api/v1/car').set('Authorization', `Bearer ${token}`).send(car);
    const { status } = await request(app)
      .patch(`/api/v1/car/${carPost.body._id}/acessorios/${carPost.body.idAcess}`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        description: 'A'
      });
    expect(status).toBe(400);
  });
});

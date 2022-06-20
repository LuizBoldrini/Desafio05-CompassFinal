const request = require("supertest");
const app = require("../../src/app");
const Car = require("../../src/app/models/Car");

let token = "";

beforeAll(async () => {
	await Car.deleteMany();
});
beforeEach(async () => {
	await Car.deleteMany();
});

let car = {
	model: "S10 3.0",
	type: "sedan",
	brand: "GM",
	color: "prata",
	year: "2003",
	accessories: [
		{
			description: "Gabine dupla"
		},
		{
			description: "Dir. Hidráulica"
		}
	],
	passengersQtd: 6
};

describe("Create new car", () => {
	beforeAll(async () => {
		const person = {
			name: "João da Silva",
			cpf: "21120038014",
			birthDay: "10/10/2003",
			email: "joazinho@email.com",
			password: "123457",
			canDrive: "yes"
		};
		await request(app).post("/api/v1/people/").send(person);
		const result = await request(app).post("/api/v1/authenticate/").send({ email: person.email, password: person.password });
		const { body } = result;
		token = body.token;
	});

	it("should create a car and return status 201", async () => {
		const Car = car;
		const { status } = await request(app).post("/api/v1/car").set("Authorization", `Bearer ${token}`).send(Car);
		expect(status).toBe(201);
	});
});

describe("List a car", () => {
	beforeAll(async () => {
		const person = {
			name: "João da Silva",
			cpf: "21120038014",
			birthDay: "10/10/2003",
			email: "joazinho@email.com",
			password: "123457",
			canDrive: "yes"
		};
		await request(app).post("/api/v1/people/").send(person);
		const result = await request(app).post("/api/v1/authenticate/").send({ email: person.email, password: person.password });
		const { body } = result;
		token = body.token;
	});
	it("must create a car and list it returning a status of 200", async () => {
		const Car = car;
		await request(app).post("/api/v1/car").set("Authorization", `Bearer ${token}`).send(Car);
		await request(app).post("/api/v1/car").send(Car);
		const response = await request(app).get("/api/v1/car/");
		expect(response.statusCode).toBe(200);
	});
});

describe("Get car by id", () => {
	it("should get car by Id, returning a status of 200", async () => {
		const Car = car;
		const { text } = await request(app).post("/api/v1/car").set("Authorization", `Bearer ${token}`).send(Car);
		const { _id } = JSON.parse(text);
		const response = await request(app).get(`/api/v1/car/${_id.toString()}`);
		expect(response.statusCode).toBe(200);
	});
});

describe("Delete car by id", () => {
	it("should delete car by Id", async () => {
		const Car = car;
		const { text } = await request(app).post("/api/v1/car").set("Authorization", `Bearer ${token}`).send(Car);
		const { _id } = JSON.parse(text);
		const response = await request(app).delete(`/api/v1/car/${_id.toString()}`);
		expect(response.statusCode).toBe(204);
	});
});
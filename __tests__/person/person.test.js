const request = require("supertest");
const app = require("../../src/app");
const Person = require("../../src/app/models/Person");

beforeAll(async () => {
	await Person.deleteMany();
});
beforeEach(async () => {
	await Person.deleteMany();
});

describe("Create a new person", () => {
	it("should create a person and return status 201", async () => {
		const person = {
			name: "Joãozinho da Silva",
			cpf: "04126271244",
			birthDay: "10-10-2002",
			email: "joazinho@emai.com",
			password: "123456",
			canDrive: "yes"
		};
		const response = await request(app).post("/api/v1/person").send(person);
		expect(response.statusCode).toBe(201);
	});
});

describe("List all person", () => {
	it("must create a person and list it returning a status of 200", async () => {
		const person = {
			name: "Joãozinho da Silva",
			cpf: "04126271244",
			birthDay: "10-10-2002",
			email: "joazinho@emai.com",
			password: "123456",
			canDrive: "yes"
		};
		await request(app).post("/api/v1/person").send(person);
		const response = await request(app).get("/api/v1/person/");
		expect(response.statusCode).toBe(200);
	});
});

describe("Get person by id", () => {
	it("should get person by Id, returning a status of 200", async () => {
		const person = {
			name: "Joãozinho da Silva",
			cpf: "04126271244",
			birthDay: "10-10-2002",
			email: "joazinho@emai.com",
			password: "123456",
			canDrive: "yes"
		};
		const { text } = await request(app).post("/api/v1/person/").send(person);
		const { _id } = JSON.parse(text);
		const response = await request(app).get(`/api/v1/person/${_id.toString()}`);
		expect(response.statusCode).toBe(200);
	});
});

describe("Delete person by id", () => {
	it("should delete person by Id", async () => {
		const person = {
			name: "Joãozinho da Silva",
			cpf: "04126271244",
			birthDay: "10-10-2002",
			email: "joazinho@emai.com",
			password: "123456",
			canDrive: "yes"
		};
		const { text } = await request(app).post("/api/v1/person/").send(person);
		const { _id } = JSON.parse(text);
		const response = await request(app).delete(`/api/v1/person/${_id.toString()}`);
		expect(response.statusCode).toBe(204);
	});
});
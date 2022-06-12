const request = require("supertest");
const app = require("../../src/app");
const Car = require("../../src/app/models/Car");


beforeAll(async () => {
	await Car.deleteMany();
});

beforeEach(async () => {
	await Car.deleteMany();
});

describe("Create a new car", () => {
	it("should create a car and return status 201", async () => {
		const car = {
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
		const response = await request(app).post("/api/v1/car").send(car);
		expect(response.statusCode).toBe(201);
	});
});

describe("List a car", () => {
	it("must create a car and list it returning a status of 200", async () => {
		const car = {
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
		await request(app).post("/api/v1/car").send(car);
		const response = await request(app).get("/api/v1/car/");
		expect(response.statusCode).toBe(200);
	});
});

describe("Get car by id", () => {
	it("should get car by Id, returning a status of 200", async () => {
		const car = {
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
		const { text } = await request(app).post("/api/v1/car/").send(car);

		const { _id } = JSON.parse(text);

		const response = await request(app).get(`/api/v1/car/${_id.toString()}`);
		const { status } = response;
		expect(status).toBe(200);
	});
});

describe("Delete car by id", () => {
	it("should delete car by Id", async () => {
		const car = {
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
		const { text } = await request(app).post("/api/v1/car/").send(car);

		const { _id } = JSON.parse(text);

		const response = await request(app).delete(`/api/v1/car/${_id.toString()}`);
		const { status } = response;
		expect(status).toBe(204);
	});
});
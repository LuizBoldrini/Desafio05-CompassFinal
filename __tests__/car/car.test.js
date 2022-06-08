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
			model: "S10 2.8",
			type: "sedan",
			brand: "GM",
			color: "branco",
			year: "2008",
			accessories: [
				{
					description: "Ar-condicionado"
				},
				{
					description: "Dir. Hidráulica"
				},
				{
					description: "Cabine Dupla"
				},
			],
			passengersQtd: 5
		};
		const response = await request(app).post("/api/v1/car").send(car);
		const { body } = response;
		expect(body.model).toBe("S10 2.8");
		expect(response.statusCode).toBe(201);
	});
});
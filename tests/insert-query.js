/* import fs from "fs/promises";
import path from "path";
import { expect } from "chai";
import request from "supertest";
import { StatusCodes } from "http-status-codes";
import { Application, createApp } from "../src/App";
import JSZip from "jszip";

const {
	OK, // 200
	// Other common codes are:
	CREATED, // 201
	NO_CONTENT, // 204
	NOT_FOUND, // 404
} = StatusCodes;

// Do not change datadirå
const datadir = "./data" as const;

describe("REST API v1", function () {
	let app: Application;

	beforeEach(async () => {
		app = await createApp({ datadir });
	});

	afterEach(async () => {
		await fs.rm(datadir, { recursive: true, force: true });
	});

	it("GET /api should respond with status OK and text 'App is running!'", async () => {
		const res = await request(app).get("/api");
		expect(res).to.have.property("status", OK);
		expect(res).to.have.property("text", "App is running!");
	});

	//SUBSECTION
	//Retrieving a specific section
	it("GET /api/v1/courses/{course}/sections/{section}, status code: 200, returns: section", async () => {
		await request(app).put("/api/v1/courses/cpsc310").send({
			title: "Introduction to Software Engineering",
			dept: "Computer Science",
			code: "310",
		});

		await request(app).put("/api/v1/courses/cpsc310/sections/21w201").send({
			instructor: "holmes, reid",
			year: 2021,
			avg: 76.4,
			pass: 167,
			fail: 3,
			audit: 1,
		});

		await request(app).put("/api/v1/courses/cpsc310/sections/21w202").send({
			instructor: "bradley, nick",
			year: 2021,
			avg: 77.1,
			pass: 172,
			fail: 1,
			audit: 0,
		});
		const res = await request(app).get("/api/v1/courses/cpsc310/sections/21w201");
		expect(res).to.have.property("status", OK);
		expect(res.body).to.have.property("id", "21w201");
		expect(res.body).to.have.property("year", 2021);
		expect(res.body).to.have.property("avg", 76.4);
		expect(res.body).to.have.property("pass", 167);
		expect(res.body).to.have.property("fail", 3);
		expect(res.body).to.have.property("audit", 1);
		expect(res.body).to.have.property("links").that.is.an("object");
		expect(res.body.links).to.have.property("self", "/api/v1/courses/cpsc310/sections/21w201");
		expect(res.body.links).to.have.property("course", "/api/v1/courses/cpsc310");
	});

	it("GET /api/v1/courses/{course}/sections/{section}, status code: 404, returns: error and not found", async () => {
		await request(app)
			.put("/api/v1/courses/cpsc310")
			.send({
				title: "Introduction to Software Engineering",
				dept: "Computer Science",
				code: "310",
				sections: [
					{
						id: "21w201",
						instructor: "holmes, reid",
						year: 2021,
						avg: 76.4,
						pass: 167,
						fail: 3,
						audit: 1,
						links: {},
					},
					{
						id: "21w202",
						instructor: "bradley, nick",
						year: 2021,
						avg: 77.1,
						pass: 172,
						fail: 1,
						audit: 0,
						links: {},
					},
				],
			});
		const res = await request(app).get("/api/v1/courses/cpsc310/sections/21w204");
		expect(res).to.have.property("status", NOT_FOUND);
		expect(res.body).to.have.property("error", "Not found");
		expect(res.body).to.have.property("message", "no section with id '21w204'");
	});

	it("GET /api/v1/courses/{course}/sections/{section}, status code: 404, returns: error", async () => {
		await request(app)
			.put("/api/v1/courses/cpsc310")
			.send({
				title: "Introduction to Software Engineering",
				dept: "Computer Science",
				code: "310",
				sections: [
					{
						id: "21w201",
						instructor: "holmes, reid",
						year: 2021,
						avg: 76.4,
						pass: 167,
						fail: 3,
						audit: 1,
						links: {},
					},
					{
						id: "21w202",
						instructor: "bradley, nick",
						year: 2021,
						avg: 77.1,
						pass: 172,
						fail: 1,
						audit: 0,
						links: {},
					},
				],
			});
		const res = await request(app).get("/api/v1/courses/cpsc310/sections/21w202");
		expect(res).to.have.property("status", NOT_FOUND);
		expect(res.body).to.have.property("error", "Not found");
	});

	//SUBSECTION

	//put but basically creating a section
	it("PUT /api/v1/courses/{course}/sections/{section}, status code: 201, returns: created section", async () => {
		await request(app).put("/api/v1/courses/cpsc310").send({
			title: "Introduction to Software Engineering",
			dept: "Computer Science",
			code: "310",
		});
		const res = await request(app).put("/api/v1/courses/cpsc310/sections/21w201").send({
			instructor: "holmes, reid",
			year: 2021,
			avg: 76.4,
			pass: 167,
			fail: 3,
			audit: 1,
		});
		expect(res).to.have.property("status", CREATED);
		expect(res.body).to.have.property("id", "21w201");
		expect(res.body).to.have.property("instructor", "holmes, reid");
		expect(res.body).to.have.property("year", 2021);
		expect(res.body).to.have.property("avg", 76.4);
		expect(res.body).to.have.property("pass", 167);
		expect(res.body).to.have.property("fail", 3);
		expect(res.body).to.have.property("audit", 1);

		expect(res.body).to.have.property("links");
		expect(res.body.links).to.have.property("self", "/api/v1/courses/cpsc310/sections/21w201");
		expect(res.body.links).to.have.property("course", "/api/v1/courses/cpsc310");
	});

	//updating a section SO RETURNING STATUS 204
	it("PUT .../sections/{section} returns 204 when updating an existing section", async () => {
		await request(app).put("/api/v1/courses/cpsc310").send({
			title: "Introduction to Software Engineering",
			dept: "Computer Science",
			code: "310",
		});
		const res = await request(app).put("/api/v1/courses/cpsc310/sections/21w201").send({
			instructor: "holmes, reid",
			year: 2020,
			avg: 74.4,
			pass: 167,
			fail: 3,
			audit: 1,
		});
		expect(res.status).to.equal(CREATED);

		const update = await request(app).put("/api/v1/courses/cpsc310/sections/21w201").send({
			instructor: "holmes, reid",
			year: 2021,
			avg: 76.4,
			pass: 167,
			fail: 3,
			audit: 1,
		});

		expect(update.status).to.equal(NO_CONTENT);
		expect(update.text).to.equal(""); // optional but nice
	});

	//404 but for updating sections
	it("GET /api/v1/courses/{course}/sections/{section}, status code: 404, for trying to put a section", async () => {
		await request(app).put("/api/v1/courses/cpsc310").send({
			title: "Introduction to Software Engineering",
			dept: "Computer Science",
			code: "310",
		});
		await request(app).put("/api/v1/courses/cpsc310/sections/21w201").send({
			instructor: "holmes, reid",
			year: 2020,
			avg: 76.4,
			pass: 167,
			fail: 3,
			audit: 1,
		});
		const res = await request(app).put("/api/v1/courses/cpsc310/sections/21w201").send({
			instructor: "holmes, reid",
			year: 2021,
			avg: 76.4,
			pass: 167,
			fail: 3,
			audit: 1,
		});
		expect(res).to.have.property("status", NO_CONTENT);
	});

	//422 as some of the characteristics for the section is wrong
	it("GET /api/v1/courses/{course}/sections/{section}, status code: 422, for trying to put a section", async () => {
		await request(app).put("/api/v1/courses/cpsc310").send({
			title: "Introduction to Software Engineering",
			dept: "Computer Science",
			code: "310",
		});
		await request(app).put("/api/v1/courses/cpsc310/sections/21w201").send({
			instructor: "holmes, reid",
			year: 2020,
			avg: 76.4,
			pass: 167,
			fail: 3,
			audit: 1,
		});
		await request(app).put("/api/v1/courses/cpsc310/sections/21w202").send({
			instructor: "bradley, nick",
			year: 2021,
			avg: 77.1,
			pass: 172,
			fail: 1,
			audit: 0,
			links: {},
		});
		const res = await request(app).put("/api/v1/courses/cpsc310/sections/21w201").send({
			year: 1899,
			avg: 101,
			pass: 167,
			fail: -1,
			audit: 1,
		});
		expect(res.status).to.equal(422);
		expect(res.body).to.have.property("error", "Validation failed");
		expect(res.body).to.have.property("fields").that.is.an("object");
		expect(res.body.fields).to.have.property("instructor", "required but missing");
		expect(res.body.fields).to.have.property("year", "expected a number between 1900 and 2099");
		expect(res.body.fields).to.have.property("avg", "expected a number between 0 and 100");
		expect(res.body.fields).to.have.property("fail", "expected a number >= 0");
	});

	it("DELETE .../sections/{section} returns 200 and the removed section", async () => {
		await request(app).put("/api/v1/courses/cpsc310").send({
			title: "Intro to Software Engineering",
			dept: "Computer Science",
			code: "310",
		});

		await request(app).put("/api/v1/courses/cpsc310/sections/21w201").send({
			instructor: "holmes, reid",
			year: 2021,
			avg: 76.4,
			pass: 167,
			fail: 3,
			audit: 1,
		});

		const res = await request(app).delete("/api/v1/courses/cpsc310/sections/21w201");

		expect(res).to.have.property("status", OK);
		expect(res.body).to.have.property("id", "21w201");
		expect(res.body).to.have.property("instructor", "holmes, reid");
		expect(res.body).to.have.property("year", 2021);
		expect(res.body).to.have.property("avg", 76.4);
		expect(res.body).to.have.property("pass", 167);
		expect(res.body).to.have.property("fail", 3);
		expect(res.body).to.have.property("audit", 1);
	});

	it("DELETE .../sections/{section} but with a section that doesn't exist, so it should return 404", async () => {
		await request(app).put("/api/v1/courses/cpsc310").send({
			title: "Intro to Software Engineering",
			dept: "Computer Science",
			code: "310",
		});

		const res = await request(app).delete("/api/v1/courses/cpsc310/sections/21w201");

		expect(res).to.have.property("status", NOT_FOUND);
		expect(res.body).to.have.property("error", "Not found");
		expect(res.body).to.have.property("message", "no section with id '21w201'");
	});

	//implementation is done
	it("GET /api/v1/courses, and return status OK", async () => {
		await request(app).put("/api/v1/courses/cpsc310").send({
			title: "Introduction to Software Engineering",
			dept: "Computer Science",
			code: "310",
		});
		const res = await request(app).get("/api/v1/courses");
		//implement this
	});

	//implementation is done
	//status 200
	it("GET /api/v1/courses, and return status OK but there is an empty list", async () => {
		const res = await request(app).get("/api/v1/courses");
		//implement this according to pagination
	});

	//implementation is done
	//status 200 with multiple courses
	it("GET /api/v1/courses, and return status OK (multiple courses", async () => {
		await request(app).put("/api/v1/courses/cpsc210").send({
			title: "Software Construction",
			dept: "Computer Science",
			code: "210",
		});
		await request(app).put("/api/v1/courses/cpsc310").send({
			title: "Introduction to Software Engineering",
			dept: "Computer Science",
			code: "310",
		});
		const res = await request(app).get("/api/v1/courses");
		//implement this with pagination
	});

	it("GET /api/v1/courses/{course}, and return status OK", async () => {
		await request(app).put("/api/v1/courses/cpsc310").send({
			title: "Introduction to Software Engineering",
			dept: "Computer Science",
			code: "310",
		});
		const res = await request(app).get("/api/v1/courses/cpsc310");
		expect(res).to.have.property("status", OK);
		expect(res.body).to.have.property("id").that.is.a("string");
		expect(res.body).to.have.property("title").that.is.a("string");
		expect(res.body).to.have.property("dept").that.is.a("string");
		expect(res.body).to.have.property("code").that.is.a("string");
		expect(res.body).to.have.property("links").that.is.an("object");
		expect(res.body.links).to.have.property("self").that.is.a("string");
		expect(res.body.links).to.have.property("sections").that.is.an("string");
	});

	it("GET /api/v1/courses/{course}, and return status 404", async () => {
		await request(app).put("/api/v1/courses/cpsc310").send({
			title: "Introduction to Software Engineering",
			dept: "Computer Science",
			code: "310",
		});
		const res = await request(app).get("/api/v1/courses/cpsc311");
		expect(res).to.have.property("status", NOT_FOUND);
		expect(res.body).to.have.property("error", "Not found");
		expect(res.body).to.have.property("message", "no course with id 'cpsc311'");
	}); //version with creating it but the course exists

	it("PUT /api/v1/courses/{course} and return status code 201, as in created", async () => {
		const res = await request(app).put("/api/v1/courses/cpsc310").send({
			title: "Introduction to Software Engineering",
			dept: "Computer Science",
			code: "310",
		});
		expect(res).to.have.property("status", CREATED);
		expect(res.body).to.have.property("links").that.is.an("object");
		expect(res.body.links).to.have.property("sections").that.is.an("string");
		expect(res.body).to.have.property("id", "cpsc310");
		expect(res.body).to.have.property("title", "Introduction to Software Engineering");
		expect(res.body).to.have.property("dept", "Computer Science");
	});

	it("PUT /api/v1/courses/{course} and return status code 204 as in updated succesfully", async () => {
		await request(app).put("/api/v1/courses/cpsc310").send({
			title: "Introduction to Software Engineering",
			dept: "CS",
			code: "310",
		});
		const res = await request(app).put("/api/v1/courses/cpsc310").send({
			title: "Introduction to Software Engineering",
			dept: "Computer Science",
			code: "310",
		});
		expect(res).to.have.property("status", NO_CONTENT);
	});

	it("PUT /api/v1/courses/{course} and return status code 422 as in validation failed", async () => {
		const res = await request(app).put("/api/v1/courses/cpsc310").send({
			title: "Introduction to Software Engineering",
			code: 310,
		});
		expect(res.status).to.equal(422);
		expect(res.body).to.have.property("error", "Validation failed");
		expect(res.body).to.have.property("fields").that.is.an("object");
		expect(res.body.fields).to.have.property("dept", "required but missing");
		expect(res.body.fields).to.have.property("code", "expected a string");
	});

	//Removing a course from an organization
	it("DEL /api/v1/courses/{course} a course and status code is OK, showing the course removed successfully", async () => {
		await request(app).put("/api/v1/courses/cpsc310").send({
			title: "Introduction to Software Engineering",
			dept: "Computer Science",
			code: "310",
		});
		const res = await request(app).delete("/api/v1/courses/cpsc310");
		expect(res).to.have.property("status", OK);
		expect(res.body).to.have.property("id", "cpsc310");
		expect(res.body).to.have.property("title", "Introduction to Software Engineering");
		expect(res.body).to.have.property("dept", "Computer Science");
	});

	//Removing a course that has a fake id to get 404 error
	it("DEL /api/v1/courses/{course} a course and status code is 404 as in not found", async () => {
		await request(app).put("/api/v1/courses/cpsc310").send({
			title: "Introduction to Software Engineering",
			dept: "Computer Science",
			code: "310",
		});
		const res = await request(app).delete("/api/v1/courses/cpsc311");
		expect(res).to.have.property("status", NOT_FOUND);
		expect(res.body).to.have.property("error", "Not found");
		expect(res.body).to.have.property("message", "no course with id 'cpsc311'");
	});

	//SUBSECTION
	//retrieving a list of section courses and status: 200
	it("GET /api/v1/courses/{course}/sections and returns the sections with status OK", async () => {
		await request(app).put("/api/v1/courses/cpsc310").send({
			title: "Introduction to Software Engineering",
			dept: "Computer Science",
			code: "310",
		});

		await request(app).put("/api/v1/courses/cpsc310/sections/21w201").send({
			instructor: "holmes, reid",
			year: 2021,
			avg: 76.4,
			pass: 167,
			fail: 3,
			audit: 1,
		});

		await request(app).put("/api/v1/courses/cpsc310/sections/21w202").send({
			instructor: "bradley, nick",
			year: 2021,
			avg: 77.1,
			pass: 172,
			fail: 1,
			audit: 0,
		});

		const res = await request(app).get("/api/v1/courses/cpsc310/sections");
		expect(res).to.have.property("status", OK);
	});

	it("GET /api/v1/courses returns empty list when no courses exist", async () => {
		const res = await request(app).get("/api/v1/courses");
		expect(res).to.have.property("status", OK);

		expect(res.body).to.deep.equal({
			items: [],
			total: 0,
			limit: 100,
			offset: 0,
		});
	});

	it("GET /api/v1/courses/:course returns the course with links", async () => {
		const courseId = "cpsc310";
		const body = {
			title: "Introduction to Software Engineering",
			dept: "Computer Science",
			code: "310",
		};
		await request(app).put(`/api/v1/courses/${courseId}`).send(body).expect(CREATED);

		const res = await request(app).get(`/api/v1/courses/${courseId}`);
		expect(res.status).to.equal(OK);

		expect(res.body).to.deep.equal({
			id: courseId,
			title: body.title,
			dept: body.dept,
			code: body.code,
			links: {
				self: `/api/v1/courses/${courseId}`,
				sections: `/api/v1/courses/${courseId}/sections`,
			},
		});
	});

	it("GET /api/v1/courses/:course returns 404 with spec error shape when not found", async () => {
		const courseId = "cpsc310";

		const res = await request(app).get(`/api/v1/courses/${courseId}`);
		expect(res.status).to.equal(NOT_FOUND);

		expect(res.body).to.deep.equal({
			error: "Not found",
			message: `no course with id '${courseId}'`,
		});
	});

	it("GET /api/v1/courses returns items sorted by id and paginated", async () => {
		await request(app)
			.put("/api/v1/courses/math200")
			.send({ title: "Calc III", dept: "Mathematics", code: "200" })
			.expect(CREATED);

		await request(app)
			.put("/api/v1/courses/cpsc310")
			.send({ title: "Intro SE", dept: "Computer Science", code: "310" })
			.expect(CREATED);

		await request(app)
			.put("/api/v1/courses/biol112")
			.send({ title: "Bio", dept: "Biology", code: "112" })
			.expect(CREATED);

		const res = await request(app).get("/api/v1/courses?limit=2&offset=1");
		expect(res.status).to.equal(OK);

		expect(res.body.total).to.equal(3);
		expect(res.body.limit).to.equal(2);
		expect(res.body.offset).to.equal(1);

		// sorted ids
		expect(res.body.items.map((c: any) => c.id)).to.deep.equal(["cpsc310", "math200"]);
	});

	// checking that pagination params affect the response (limit + offset)
	it("GET /api/v1/courses respects limit and offset query params", async () => {
		const res = await request(app).get("/api/v1/courses?limit=5&offset=10");
		expect(res.status).to.equal(OK);

		expect(res.body).to.deep.equal({
			items: [],
			total: 0,
			limit: 5,
			offset: 10,
		});
	});

	it("GET /api/v1/courses respects limit and offset query params", async () => {
		const res = await request(app).get("/api/v1/courses?limit=0&offset=-1");
		expect(res.status).to.equal(400);
		expect(res.body).to.deep.equal({
			error: "Invalid request parameters",
			params: {
				limit: "expected an integer between 1 and 5000",
				offset: "expected an integer >= 0",
			},
		});
	});

	//get sections tests
	it("GET /api/v1/courses/course/sections returns empty list when no sections exist", async () => {
		await request(app).put("/api/v1/courses/cpsc310").send({
			title: "Introduction to Software Engineering",
			dept: "Computer Science",
			code: "310",
			sections: [],
		});
		const res = await request(app).get("/api/v1/courses/cpsc310/sections");
		expect(res).to.have.property("status", OK);

		expect(res.body).to.deep.equal({
			items: [],
			total: 0,
			limit: 100,
			offset: 0,
		});
	});

	// checking that pagination params affect the response (limit + offset)
	it("GET /api/v1/courses/course/sections respects limit and offset query params", async () => {
		await request(app).put("/api/v1/courses/cpsc310").send({
			title: "Introduction to Software Engineering",
			dept: "Computer Science",
			code: "310",
			sections: [],
		});
		const res = await request(app).get("/api/v1/courses/cpsc310/sections?limit=5&offset=10");
		expect(res.status).to.equal(OK);

		expect(res.body).to.deep.equal({
			items: [],
			total: 0,
			limit: 5,
			offset: 10,
		});
	});
}) */
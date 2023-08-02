require("dotenv").config();

const mongoose = require("mongoose");
const supertest = require("supertest");

const app = require("../app");
const {User} = require("../models/user");

mongoose.set("strictQuery", false);

const { DB_HOST } = process.env;

describe("login", () => {
  beforeAll(async () => {
    await mongoose.connect(DB_HOST);

    await supertest(app).post("/users/register").send({
      email: "test@gmail.com",
      password: "123456",
    });
  });

  afterAll(async () => {
    await User.deleteMany();

    await mongoose.disconnect(DB_HOST);
  });

  test("should login existed user", async () => {
    const response = await supertest(app).post("/users/login").send({
      email: "test@gmail.com",
      password: "123456",
    });

    const user = await User.findOne({ email: "test@gmail.com" });

    //the response must have a status code of 200
    expect(response.statusCode).toBe(200);

    // the response should return a token
    expect(response.body.token).toBe(user.token);
  });
});
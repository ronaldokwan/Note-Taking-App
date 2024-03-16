const request = require("supertest");
const app = require("../app");
const { User, Note, Order } = require("../models");
const { hashPassword } = require("../helpers/bcrypt");
const { signToken } = require("../helpers/jwt");

describe("Controller", () => {
  let access_token;
  let userId;
  let noteId;

  beforeAll(async () => {
    const password = hashPassword("password");
    const user = await User.create({
      username: "testuser",
      email: "test@example.com",
      password,
    });
    userId = user.id;

    const payload = { id: user.id };
    access_token = signToken(payload);

    const note = await Note.create({
      title: "Test Note",
      content: "This is a test note",
      tag: "Test",
      userId,
    });
    noteId = note.id;
  });

  afterAll(async () => {
    await User.destroy({ where: { id: userId } });
    await Note.destroy({ where: { id: noteId } });
  });

  describe("POST /register", () => {
    it("should register a new user", async () => {
      const response = await request(app).post("/register").send({
        username: "newuser",
        email: "newuser@example.com",
        password: "password",
      });

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty("id");
      expect(response.body).toHaveProperty("username", "newuser");
      expect(response.body).toHaveProperty("email", "newuser@example.com");
    });

    it("should return an error if username is missing", async () => {
      const response = await request(app).post("/register").send({
        email: "newuser@example.com",
        password: "password",
      });

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty("message", "Username is required");
    });

    // Add similar tests for other missing parameter cases

    it("should return an error if email already exists", async () => {
      const response = await request(app).post("/register").send({
        username: "existinguser",
        email: "test@example.com",
        password: "password",
      });

      expect(response.status).toBe(401);
      expect(response.body).toHaveProperty("message", "Email already exist");
    });
  });

  describe("POST /login", () => {
    it("should login with valid credentials", async () => {
      const response = await request(app).post("/login").send({
        email: "test@example.com",
        password: "password",
      });

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("access_token");
    });

    it("should return an error if email is missing", async () => {
      const response = await request(app).post("/login").send({
        password: "password",
      });

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty("message", "Email is required");
    });

    // Add similar tests for other missing parameter cases

    it("should return an error if email/password is invalid", async () => {
      const response = await request(app).post("/login").send({
        email: "test@example.com",
        password: "wrongpassword",
      });

      expect(response.status).toBe(401);
      expect(response.body).toHaveProperty("message", "Invalid email/password");
    });
  });

  describe("GET /", () => {
    it("should get home page notes", async () => {
      const response = await request(app)
        .get("/")
        .set("Authorization", `Bearer ${access_token}`);

      expect(response.status).toBe(200);
      expect(response.body).toBeInstanceOf(Array);
      expect(response.body.length).toBeGreaterThan(0);
    });

    it("should return 401 if no authorization token provided", async () => {
      const response = await request(app).get("/");

      expect(response.status).toBe(401);
    });
  });

  describe("GET /archived", () => {
    it("should get archived notes", async () => {
      const response = await request(app)
        .get("/archived")
        .set("Authorization", `Bearer ${access_token}`);

      expect(response.status).toBe(200);
      expect(response.body).toBeInstanceOf(Array);
    });

    it("should return 401 if no authorization token provided", async () => {
      const response = await request(app).get("/archived");

      expect(response.status).toBe(401);
    });
  });

  describe("POST /add-note", () => {
    it("should add a new note", async () => {
      const response = await request(app)
        .post("/add-note")
        .set("Authorization", `Bearer ${access_token}`)
        .send({
          title: "New Note",
          content: "This is a new note",
          tag: "New",
        });

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty("id");
      expect(response.body).toHaveProperty("title", "New Note");
      expect(response.body).toHaveProperty("content", "This is a new note");
      expect(response.body).toHaveProperty("tag", "New");
      expect(response.body).toHaveProperty("userId", userId);
    });

    it("should return 401 if no authorization token provided", async () => {
      const response = await request(app).post("/add-note").send({
        title: "New Note",
        content: "This is a new note",
        tag: "New",
      });

      expect(response.status).toBe(401);
    });

    it("should return 400 if required fields are missing", async () => {
      const response = await request(app)
        .post("/add-note")
        .set("Authorization", `Bearer ${access_token}`)
        .send({});

      expect(response.status).toBe(400);
    });
  });

  describe("PUT /update-note/:id", () => {
    it("should update a note", async () => {
      const response = await request(app)
        .put(`/update-note/${noteId}`)
        .set("Authorization", `Bearer ${access_token}`)
        .send({
          title: "Updated Note",
          content: "This note has been updated",
          tag: "Updated",
        });

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("message", "Note has been updated");
    });

    it("should return 401 if no authorization token provided", async () => {
      const response = await request(app).put(`/update-note/${noteId}`).send({
        title: "Updated Note",
        content: "This note has been updated",
        tag: "Updated",
      });

      expect(response.status).toBe(401);
    });

    it("should return 404 if note not found", async () => {
      const response = await request(app)
        .put("/update-note/invalid_id")
        .set("Authorization", `Bearer ${access_token}`)
        .send({
          title: "Updated Note",
          content: "This note has been updated",
          tag: "Updated",
        });

      expect(response.status).toBe(404);
    });
  });

  describe("DELETE /delete-note/:id", () => {
    it("should delete a note", async () => {
      const response = await request(app)
        .delete(`/delete-note/${noteId}`)
        .set("Authorization", `Bearer ${access_token}`);

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("message", "Note has been deleted");
    });

    it("should return 401 if no authorization token provided", async () => {
      const response = await request(app).delete(`/delete-note/${noteId}`);

      expect(response.status).toBe(401);
    });

    it("should return 404 if note not found", async () => {
      const response = await request(app)
        .delete("/delete-note/invalid_id")
        .set("Authorization", `Bearer ${access_token}`);

      expect(response.status).toBe(404);
    });
  });

  describe("PATCH /update-archived/:id", () => {
    it("should archive a note", async () => {
      const note = await Note.create({
        title: "Archived Note",
        content: "This note will be archived",
        tag: "Archived",
        userId,
      });

      const response = await request(app)
        .patch(`/update-archived/${note.id}`)
        .set("Authorization", `Bearer ${access_token}`)
        .send({ archived: true });

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("message", "Note has been archived");

      await note.destroy();
    });

    it("should return 401 if no authorization token provided", async () => {
      const response = await request(app)
        .patch(`/update-archived/${noteId}`)
        .send({
          archived: true,
        });

      expect(response.status).toBe(401);
    });

    it("should return 404 if note not found", async () => {
      const response = await request(app)
        .patch("/update-archived/invalid_id")
        .set("Authorization", `Bearer ${access_token}`)
        .send({ archived: true });

      expect(response.status).toBe(404);
    });
  });
  describe("GET /anime", () => {
    it("should get an anime GIF", async () => {
      const response = await request(app)
        .get("/anime")
        .set("Authorization", `Bearer ${access_token}`);

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("data");
    });
  });

  describe("GET /trivia", () => {
    it("should get a trivia fact", async () => {
      const response = await request(app)
        .get("/trivia")
        .set("Authorization", `Bearer ${access_token}`);

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("text");
      expect(response.body).toHaveProperty("number");
    });
  });

  describe("GET /payment", () => {
    it("should generate a payment token", async () => {
      const response = await request(app)
        .get("/payment")
        .set("Authorization", `Bearer ${access_token}`);

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("message", "success");
      expect(response.body).toHaveProperty("transactionToken");
      expect(response.body).toHaveProperty("orderId");
    });
  });

  describe("PATCH /upgrade", () => {
    it("should upgrade user to donated status", async () => {
      const order = await Order.create({
        orderId: "test_order_id",
        amount: 10000,
        userId,
      });

      const response = await request(app)
        .patch("/upgrade")
        .set("Authorization", `Bearer ${access_token}`)
        .send({ orderId: order.orderId });

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("message", "upgrade success");

      await order.destroy();
    });
  });
});

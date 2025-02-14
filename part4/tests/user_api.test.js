const { test, after, beforeEach, describe } = require("node:test");
const assert = require("node:assert");
const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const testHelper = require("./test_helper");
const bcrypt = require("bcrypt")
const User = require("../models/user");

const api = supertest(app);


describe('when initially there are 2 users', () => {
    beforeEach(async () => {
        await User.deleteMany();
        const userObjects = await Promise.all(
            testHelper.initialUsers.map(async (user) => {
                const passwordHash = await bcrypt.hash(user.password, 10);
                return new User({ name: user.name, username: user.username, passwordHash });
            })
        );
        await Promise.all(userObjects.map(user => user.save()))
    });


    test("users are returned as json", async () => {
        await api
            .get("/api/users")
            .expect(200)
            .expect("Content-Type", /application\/json/);
        const response = await api.get("/api/users");
        console.log(response.body);

        assert.strictEqual(response.body.length, testHelper.initialUsers.length);
    });

    test("no password or password hash", async () => {
        await api
            .get("/api/users")
            .expect(200)
            .expect("Content-Type", /application\/json/);
        const response = await api.get("/api/users");
        assert.deepStrictEqual(response.body[0].passwordHash, undefined, "passwordHash shouldn't exist");
        assert.deepStrictEqual(response.body[0].password, undefined, "password shouldn't exist");
    });

    test("Bad Request if username or password missing or < 3 character long", async () => {
        const user = {
            username: "ab",
            name: "Anrew Boyko",
            password: "39.&sK;#_aX,"
        }

        await api
            .post("/api/users")
            .send(user)
            .expect(400)
            .expect("Content-Type", /application\/json/);

        const user2 = {
            username: "homer_s",
            name: "Homer Simpson",
            password: "hs"
        }

        await api
            .post("/api/users")
            .send(user2)
            .expect(400)
            .expect("Content-Type", /application\/json/);

    })

    after(async () => {
        await mongoose.connection.close();
    });
})
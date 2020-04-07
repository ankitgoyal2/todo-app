const request = require("supertest");
const expect = require("expect");
const { ObjectID } = require("mongodb");

const { app } = require("../server");
const { todoModel } = require("./../models/todos");
const { userModel } = require("./../models/users");
const { todos, populateTodos, users, populateUsers } = require("./seed/seed");

beforeEach(populateTodos);
beforeEach(populateUsers);

describe("post  /todos", () => {
    it(" should create a todo", (done) => {
        var text = "test todo text";

        request(app)
            .post("/todos")
            .set("x-auth", users[0].tokens[0].token)
            .send({ text })
            .expect(200)
            .expect((res) => {
                expect(res.body.text).toBe(text);
            })
            .end((err, res) => {
                if (err) {
                    return done(err);
                }

                todoModel
                    .find({ text })
                    .then((todos) => {
                        expect(todos.length).toBe(1);
                        expect(todos[0].text).toBe(text);
                        done();
                    })
                    .catch((err) => {
                        return done(err);
                    });
            });
    });

    it("should not create invalid todo", (done) => {
        request(app)
            .post("/todos")
            .send({})
            .set("x-auth", users[0].tokens[0].token)
            .expect(400)
            // .expect((res)=>{
            //     expect(res.body.text).toBe('');
            // })
            .end((err, res) => {
                if (err) return done(err);

                todoModel
                    .find()
                    .then((res) => {
                        expect(res.length).toBe(2);
                        done();
                    })
                    .catch((err) => done(err));
            });
    });
});

describe("GET /todos", () => {
    it("should GET all todos", (done) => {
        request(app)
            .get("/todos")
            .set("x-auth", users[0].tokens[0].token)
            .expect(200)
            .expect((res) => {
                expect(res.body.todos.length).toBe(1);
            })
            .end((err, res) => {
                if (err) return done(err);

                todoModel
                    .find()
                    .then((res) => {
                        expect(res.length).toBe(2);
                        done();
                    })
                    .catch((e) => done(e));
            });
    });
});

describe("GET /todos/:id", () => {
    it("gets the todo for the given id", (done) => {
        request(app)
            .get(`/todos/${todos[0]._id.toHexString()}`)
            .set("x-auth", users[0].tokens[0].token)
            .expect(200)
            .expect((res) => {
                expect(res.body.text).toBe(todos[0].text);
            })
            .end(done);
    });

    it("should not return todo for other user", (done) => {
        request(app)
            .get(`/todos/${todos[1]._id.toHexString()}`)
            .set("x-auth", users[0].tokens[0].token)
            .expect(404)
            .end(done);
    });

    it("should return 404 for non ObjectID", (done) => {
        request(app)
            .get(`/todos/12324`)
            .set("x-auth", users[0].tokens[0].token)
            .expect(404)
            .end(done);
    });

    it("should return 404 for if todo not found", (done) => {
        request(app)
            .get(`/todos/${new ObjectID().toHexString()}`)
            .set("x-auth", users[0].tokens[0].token)
            .expect(404)
            .end(done);
    });
});

describe("PATCH /todos/:id", () => {
    const updatedText = "text is changed";

    it("should update the todo", (done) => {
        request(app)
            .patch(`/todos/${todos[0]._id.toHexString()}`)
            .set("x-auth", users[0].tokens[0].token)
            .send({ text: updatedText, completed: true })
            .expect(200)
            .expect((res) => {
                expect(res.body.text).toBe(updatedText);
                expect(res.body.completed).toBe(true);
                expect(res.body.completedAt).toBeA("number");
            })
            .end(done);
    });

    it("should not update todo of other user", (done) => {
        request(app)
            .patch(`/todos/${todos[1]._id.toHexString()}`)
            .set("x-auth", users[0].tokens[0].token)
            .send({ text: updatedText, completed: true })
            .expect(404)
            .end(done);
    });

    it("should clear completedAt when completed is false", (done) => {
        request(app)
            .patch(`/todos/${todos[1]._id.toHexString()}`)
            .set("x-auth", users[1].tokens[0].token)
            .send({ text: updatedText, completed: false })
            .expect(200)
            .expect((res) => {
                expect(res.body.text).toBe(updatedText);
                expect(res.body.completed).toBe(false);
                expect(res.body.completedAt).toNotExist();
            })
            .end(done);
    });
});

describe("POST /users", () => {
    var email = "aman@gmail.com";
    var password = "amanPass";
    it("should create a user", (done) => {
        request(app)
            .post("/users")
            .send({ email, password })
            .expect(200)
            .expect((res) => {
                expect(res.header["x-auth"]).toExist();
                expect(res.body._id).toExist();
                expect(res.body.email).toBe(email);
            })
            .end((err, res) => {
                if (err) {
                    return done(err);
                }
                userModel
                    .findOne({ email })
                    .then((user) => {
                        expect(user).toExist();
                        expect(user.password).toNotBe(password);
                        done();
                    })
                    .catch((err) => done(err));
            });
    });

    it("should return validation errors if request invalid", (done) => {
        request(app)
            .post("/users")
            .send({ email: "ankit", password: "1234" })
            .expect(400)
            .end(done);
    });

    it("should not create user if already in use", (done) => {
        request(app)
            .post("/users")
            .send({ email: users[0].email, password: "123456abc" })
            .expect(400)
            .end(done);
    });
});

describe("GET /users/me", () => {
    it("should returns user if authenticated", (done) => {
        request(app)
            .get("/users/me")
            .set("x-auth", users[0].tokens[0].token)
            .send()
            .expect(200)
            .expect((res) => {
                expect(res.body._id).toBe(users[0]._id.toHexString());
                expect(res.body.email).toBe(users[0].email);
            })
            .end(done);
    });

    it("should return 401 if not authenticated", (done) => {
        request(app)
            .get("/users/me")
            .send()
            .expect(401)
            .expect((res) => {
                expect(res.body).toEqual({});
            })
            .end(done);
    });
});

describe("POST users/login", () => {
    it("should login user and return auth token", (done) => {
        request(app)
            .post("/users/login")
            .send({ email: users[0].email, password: users[0].password })
            .expect(200)
            .expect((res) => {
                expect(res.header["x-auth"]).toExist();
                expect(res.body._id).toExist();
                expect(res.body.email).toBe(users[0].email);
            })
            .end((err, res) => {
                if (err) {
                    return done(err);
                }
                userModel
                    .findById(users[0]._id)
                    .then((user) => {
                        expect(user.tokens[1]).toInclude({
                            access: "auth",
                            token: res.headers["x-auth"],
                        });
                        done();
                    })
                    .catch((e) => done(e));
            });
    });

    it("should reject invalid login", (done) => {
        request(app)
            .post("/users/login")
            .send({ email: users[0].email, password: "123654" })
            .expect(400)
            .expect((res) => {
                expect(res.header["x-auth"]).toNotExist();
                expect(res.body).toEqual({});
            })
            .end((err, res) => {
                if (err) {
                    return done(err);
                }
                userModel
                    .findById(users[0]._id)
                    .then((user) => {
                        expect(user.tokens.length).toBe(1);
                        done();
                    })
                    .catch((e) => done(e));
            });
    });
});

describe("DELETE users/me/token", () => {
    it("should dalete token on logout", (done) => {
        request(app)
            .delete("/users/me/token")
            .set("x-auth", users[0].tokens[0].token)
            .expect(200)
            .end((err, res) => {
                if (err) {
                    return done(err);
                }
                userModel
                    .findById(users[0]._id)
                    .then((user) => {
                        expect(user.tokens.length).toEqual(0);
                        done();
                    })
                    .catch((e) => done(e));
            });
    });
});

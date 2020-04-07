const { ObjectID } = require("mongodb");
const jwt = require("jsonwebtoken");

const { todoModel } = require("./../../models/todos");
const { userModel } = require("./../../models/users");

const userOneId = new ObjectID();
const userTwoId = new ObjectID();
const users = [
    {
        _id: userOneId,
        email: "ankit@gmail.com",
        password: "userOnePass",
        tokens: [
            {
                access: "auth",
                token: jwt
                    .sign(
                        { _id: userOneId.toHexString() , access: "auth" },
                        "my secret key"
                    )
                    .toString(),
            },
        ]
    },
    {
        _id : userTwoId,
        email : "ankit1@gmail.com",
        password : "userTwoPass",
        tokens: [
            {
                access: "auth",
                token: jwt
                    .sign(
                        { _id: userTwoId.toHexString() , access: "auth" },
                        "my secret key"
                    )
                    .toString(),
            },
        ]

    }
];

const todos = [
    { _id: new ObjectID(), text: "todo1" , _creator : userOneId },
    { _id: new ObjectID(), text: "todo2", completed: true, completedAt: 483 ,_creator : userTwoId},
];

const populateTodos = (done) => {
    todoModel
        .deleteMany({})
        .then(() => {
            return todoModel.insertMany(todos);
        })
        .then(() => done())
        .catch((err) => {
            console.log("error in beforeEach " + err);
        });
};

const populateUsers = (done) =>{
    userModel.deleteMany({})
    .then(()=>{
        var userOne = new userModel(users[0]).save();
        var userTwo = new userModel(users[1]).save();

        return Promise.all([userOne,userTwo]);
    })
    .then(()=>{
        done();
    })
}

module.exports = {
    todos,
    populateTodos,
    users,
    populateUsers,
};

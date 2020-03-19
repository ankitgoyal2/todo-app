const {ObjectID} = require('mongodb')

const { mongoose } = require("./../server/db/mongoose");
const { todoModel } = require("./../server/models/todos");
const {userModel} = require('./../server/models/users');

var idForTodo = "5e7333faf5ee302a844a65a8";
var idForUser = "5e723b3d3b524c0770b96bd0"

// if(!ObjectID.isValid(idForTodo)){
//     console.log('id not found');
// }

// todoModel
//     .findOne({ _id: idForTodo }) //here we can check 'idForTodo' directly with '_id' (without converting 'idForTodo' to the objectID)
//     .then(todo => {
//         console.log("todo" + todo);
//     })
//     .catch(e => console.log("error/id not found"));

// todoModel
//     .findById(idForTodo)
//     .then(todo => {
//         if(!todo)
//             return console.log('id not found');
//         console.log("todo" + todo);
//     })
//     .catch(e => console.log('error/id not found'));

userModel.findById(idForUser)
    .then((user)=>{
        console.log('user is '+user.email);
    })
    .catch((e)=>{
        console.log('error occured'+e);
    })





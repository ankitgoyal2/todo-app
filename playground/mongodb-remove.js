const {ObjectID} = require('mongodb')

const { mongoose } = require("./../server/db/mongoose");
const { todoModel } = require("./../server/models/todos");
const {userModel} = require('./../server/models/users');

// todoModel.remove({})
// .then((res)=>{console.log(res);})
// .catch((e)=>console.log('error'));

// todoModel.findByIdAndRemove
todoModel.findByIdAndRemove('5e74edb74121f2941423ae17')
.then((res)=>{console.log(res);})
.catch((e)=>console.log('error'));



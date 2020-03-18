const express = require('express');
const bodyParser = require('body-parser');

const {mongoose} = require('./db/mongoose.js');
const {todoModel} = require('./models/todos');
const {userModel} = require('./models/users');

var app = express();

app.use(bodyParser.json());

app.post('/todos',(req,res)=>{
    console.log(req.body);
    var todo = new todoModel({
        text : req.body.text, 
    })

    todo.save()
        .then((doc)=>{
            res.send(doc);
        },(err)=>{
            res.status(400).send(err);
        })

})


app.listen(3000,()=>{
    console.log('server started on port 3000');
})

module.exports = {
    app,
}














































// var newTodo = new todoModel({
//     test: "  a"
//     // test: "physics",
//     // completed: true,
//     // completedAt: 10
// });
// newTodo
//     .save()
//     .then(res => {
//         console.log(`result is ${res}`);
//         // disconnect();
//     })
//     .catch(err => {
//         console.log(`err in saving ${err}`);
//         disconnect();
//     });


// const newUser = new userModel({ email: "ankit@gmail.com" });
// newUser
//     .save()
//     .then(res => {
//         console.log("result is " + res);
//         disconnect();
//     })
//     .catch(err => {
//         console.log("error in saving newUser : " + err);
//         disconnect();
//     });

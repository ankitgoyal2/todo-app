const _ = require('lodash');
const express = require("express");
const bodyParser = require("body-parser");
const { ObjectID } = require("mongodb");

const { mongoose } = require("./db/mongoose.js");
const { todoModel } = require("./models/todos");
const { userModel } = require("./models/users");

var app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.post("/todos", (req, res) => {
    // console.log(req.body);
    var todo = new todoModel({
        text: req.body.text
    });

    todo.save().then(
        doc => {
            res.send(doc);
        },
        err => {
            res.status(400).send(err);
        }
    );
});

app.get("/todos", (req, res) => {
    todoModel
        .find()
        .then(todos => {
            // console.log(todos);
            res.send({ todos });
        })
        .catch(e => res.sendStatus(400).send(e));
});

app.get("/todos/:id", (req, res) => {
    var id = req.params.id;

    if (!ObjectID.isValid(id)) {
        return res.status(404).send();
    }

    todoModel
        .findById(id)
        .then(todo => {
            if (!todo) {
                return res.status(400).send("id not found");
            }
            res.send(todo);
        })
        .catch(e => {
            res.status(400).send("id not found");
        });
});


app.delete("/todos/:id",(req,res)=>{
    const id = req.params.id;

    if (!ObjectID.isValid(id)) {
        return res.status(404).send();
    }

    todoModel.findByIdAndRemove(id)
    .then((todo)=>{
        if(!todo){
            return res.status(404).send("id not found");
        }
        res.status(200).send(todo);
    })
    .catch(()=>{
        res.status(400).send();
    })
})


app.patch("/todos/:id",(req,res)=>{
    const id = req.params.id;

    if (!ObjectID.isValid(id)) {
        return res.status(404).send();
    }

    var body = _.pick(req.body,['text','completed']);

    if( _.isBoolean(body.completed) && body.completed ){
        body.completedAt = new Date().getTime();
    }else{
        body.completed = false;
        body.completedAt = null;
    }

    todoModel.findByIdAndUpdate(id,{$set : body},{new : true})
    .then((todo)=>{
        if(!todo){
            return res.status(404).send("id not found");
        }
        res.status(200).send(todo);
    })
    .catch(()=>{
        res.status(400).send();
    })

})

app.listen(port, () => {
    console.log(`server started on ${port}`);
});

module.exports = {
    app
};


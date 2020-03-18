const mongoose = require('mongoose');

// const todoSchema = new mongoose.Schema(  {  name : String   }  );
// var todoModel = mongoose.model("todo", todoSchema);

var todoModel = mongoose.model(
    "todos",
    new mongoose.Schema({
        text: { type: String, minlength: 1, required: true, trim: true },
        completed: { type: Boolean, default: false },
        completedAt: { type: Number, default: null }
    })
);

module.exports = {
    todoModel,
}
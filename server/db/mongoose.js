const mongoose = require("mongoose");

mongoose.Promise = global.Promise;

const url = process.env.MONGODB_URI ;
mongoose
    .connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify : false, useCreateIndex : true})
    .then(() => {
        console.log("connect successful");
    })
    .catch(err => {
        console.log("error in connect" + err);
    });

var disconnect = () => {
    mongoose.connection.close(err => {
        if (err) console.log(`error in closing connection : ${err}`);
        else {
            console.log("disconnected successfully");
        }
    });
};

module.exports = {
    mongoose,
    disconnect,
}

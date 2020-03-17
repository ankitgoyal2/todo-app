const {MongoClient,ObjectID} =  require('mongodb');
// import { MongoClient,ObjectID } from "mongodb";

const newID = new ObjectID();
console.log(newID);
MongoClient.connect(
    "mongodb://localhost:27017/",
    { useUnifiedTopology: true },
    (err, client) => {
        if (err) {
            return console.log("unable to connect to mongodb server");
        }
        console.log("connected mongodb to server");

        client
            .db("TodoApp")
            .collection("todo")
            .insertOne(
                {
                    name: "ankit",
                    age: 30
                },
                (err, result) => {
                    if (err) {
                        return console.log(err);
                    }
                    // console.log(result.ops);
                    console.log(JSON.stringify(result.ops,undefined,2));
                    client.close();
                }
            );

    }
);

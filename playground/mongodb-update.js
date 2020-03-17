const MongoClient = require('mongodb').MongoClient;

const url = 'mongodb://localhost';

MongoClient.connect(url,{ useUnifiedTopology: true },(err,client)=>{
    if(err) throw err;
    console.log('connected to the database');


    client.db("TodoApp").collection("todo").updateMany({name : "ankit"},{$set:{name :"NewName"}}).then((res)=>{
        console.log(res);
        client.close();
    },(err)=>{
        client.close();
        console.log(`${err}`);
    })
}) 
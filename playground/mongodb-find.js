const MongoClient = require('mongodb').MongoClient;

const url = 'mongodb://localhost';

MongoClient.connect(url,{ useUnifiedTopology: true },(err,client)=>{
    if(err) throw err;
    console.log('connected to the database');

    client.db("TodoApp").collection("todo").find().toArray().then((res)=>{
        console.log(JSON.stringify(res,undefined,2));
        client.close();
    },(err)=>{
        console.log(`${err}`);
    })
})
const MongoClient = require('mongodb').MongoClient;

const url = 'mongodb://localhost';

MongoClient.connect(url,{ useUnifiedTopology: true },(err,client)=>{
    if(err) throw err;
    console.log('connected to the database');


    //deleteOne deletes a single document and does not return it
    // client.db("TodoApp").collection("todo").deleteOne({completed : false}).then((res)=>{
    //     console.log(JSON.stringify(res,undefined,2));
    //     client.close();
    // },(err)=>{
    //     console.log(`${err}`);
    // })

    //findOneAndDelete deletes a single document and does returns it as result
    client.db("TodoApp").collection("todo").findOneAndDelete({completed : false}).then((res)=>{
        console.log(JSON.stringify(res,undefined,2));
        client.close();
    },(err)=>{
        console.log(`${err}`);
    })
}) 
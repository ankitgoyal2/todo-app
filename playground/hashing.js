// const {SHA256} = require('crypto-js');

// console.log(SHA256('i am ankit fvjvilvlfmv').toString());

// let data = {
//     id : 5
// }

// let token = {
//     data,
//     hash : SHA256(JSON.stringify(data)+"something").toString()
// }

// var resultHash = SHA256(JSON.stringify(data)+"something").toString();

// if(resultHash === token.hash){
//     console.log('matched');
// }else{
//     console.log('did not matched');
// }

//================================================================

const jwt = require('jsonwebtoken');

let data = {
    id : 5
}

const token  = jwt.sign(data,"secret key");
console.log(token);

const decoded = jwt.verify(token,'secret key');
console.log(decoded);


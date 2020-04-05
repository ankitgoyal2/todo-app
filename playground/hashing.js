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

// const jwt = require('jsonwebtoken');

// let data = {
//     id : 5
// }

// const token  = jwt.sign(data,"secret key");
// console.log(token);

// const decoded = jwt.verify(token,'secret key');
// console.log(decoded);

//================================================================

const bcrypt = require('bcryptjs');

var password = "ankit123";

// bcrypt.genSalt()
//     .then((salt)=>{
//         console.log(salt);
//     })

    // or

// bcrypt.genSalt(10,(err,salt)=>{
    // bcrypt.hash(password,salt,(error,hash)=>{
    //     console.log(`hash is ${hash}`);
    // })
// })

var hashed = "$2a$10$6IMLn3ejJaIV88BAFPpQB.89CO9Qi.LxKYd86S0Pd3SZ0zKM8mrHy";

bcrypt.compare(password,hashed)
    .then((fulfill)=>{
        console.log('jkng');
        console.log(fulfill);
    })
    .catch((reject)=>{
        console.log('2455');
        console.log(reject);
    })


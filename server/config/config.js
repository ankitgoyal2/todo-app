const env = process.env.NODE_ENV || "development";

if( env === "development" || env === "test" ){
    var config = require('./config.json');
    var envConfig = config[env];

    // console.log(envConfig);
    Object.keys(envConfig).forEach((key)=>{
        process.env[key] = envConfig[key];
    })
}

// if (env === "development") {
//     process.env.PORT = 3000;
//     process.env.MONGODB_URI = "mongodb://localhost/TodoApp";
// } else if (env === "test") {
//     process.env.PORT = 3000;
//     process.env.MONGODB_URI = "mongodb://localhost/TodoAppTest";
// }

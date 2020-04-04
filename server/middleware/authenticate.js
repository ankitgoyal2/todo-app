const {userModel} = require('./../models/users');

var authenticate = (req,res,next)=>{
    const token = req.header('x-auth');
    userModel.findByToken(token)
        .then((user)=>{
            if(!user){
                return Promise.reject();
            }
            req.user = user ;
            req.token = token ;
            next();
        })
        .catch((e)=>{
            res.status(401).send();
        })
}

module.exports = {
    authenticate,
}
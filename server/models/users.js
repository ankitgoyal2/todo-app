const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const _ = require("lodash");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        minlength: 1,
        trim: true,
        unique: true,
        validate: {
            validator: validator.isEmail,
            message: "{VALUE} is not a vaild email",
        },
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
    },
    tokens: [
        {
            access: {
                type: String,
                required: true,
            },
            token: {
                type: String,
                required: true,
            },
        },
    ],
});

userSchema.methods.toJSON = function () {
    var user = this;
    var userObj = user.toObject();

    return _.pick(userObj, ["email", "_id"]);
};

userSchema.methods.generateAuthToken = function () {
    let user = this;
    const access = "auth";
    const token = jwt
        .sign({ _id: user._id.toHexString(), access: access }, "my secret key")
        .toString();

    user.tokens.push({ access, token });

    return user.save().then(() => {
        return token;
    });
};

userSchema.statics.findByToken = function (token) {
    var User = this;
    var decoded;

    try {
        decoded = jwt.verify(token, "my secret key");
    } catch (error) {
        // return new Promise((resolve,reject)=>{
        //     reject();
        // })
        return Promise.reject();
    }

    return User.findOne({
        _id: decoded._id,
        "tokens.token": token,
        "tokens.access": "auth",
    });
};

userSchema.pre("save", function (next) {
    var user = this;

    if (user.isModified("password")) {
        bcrypt.genSalt(10)
        .then((salt) => {
            return bcrypt.hash(user.password,salt)
        })
        .then((hashedPassword)=>{
            user.password = hashedPassword;
            next();
        })
        .catch((err)=>{
            console.log('some error occured before saving user in pre method',err);
            next();
        });
    }else{
        next();
    }
});

var userModel = mongoose.model("users", userSchema);

module.exports = {
    userModel,
};

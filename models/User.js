const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:[true,"Please Enter Username"],
    },
    email:{
        type:String,
        required:[true,"Please Enter your Email"],
        unique:true,
        validate:[validator.isEmail,"Please Enter a valid Email"]
    },
    firstName:{
        type:String,
    },
    lastName:{
        type: String,
    },
    password:{
        type:String,
        required:[true,"Please Enter your Password"],
        minLength:[8,"Password Should be greater or equal to 8 character"],
        select:false
    },
    otp: { type: Number, required: false },
    otpExpires: { type: Date, required: false },
    verified: {
        type: Boolean,
        default: false
    },
    avatar:[{
        public_id:{
            type:String,
        },
        url:{
            type:String,
        }
    }],
    location: String,
    age: Number,
    workDetails: [{
        company: {
            type: String,
            required: true
        },
        position: {
            type: String,
            required: true
        },
        startDate: {
            type: Date,
            required: true
        },
        endDate: {
            type: Date
        },
        responsibilities: {
            type: [String]
        }
    }],
});

userSchema.pre("save",async function(next){
    
    if(!this.isModified("password"))
    {
        next();
    }
    this.password = await bcrypt.hash(this.password,10);

});

// JWT Token
userSchema.methods.getJwtToken = function (){
    return jwt.sign({id:this._id}, process.env.JWT_SECRET_KEY ,{
        expiresIn:"5d",
    });
}

// compare password
userSchema.methods.comparePassword = async function(enteredPassword)
{
    return await bcrypt.compare(enteredPassword,this.password);
}

module.exports = mongoose.model("User",userSchema);
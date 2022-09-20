const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt')

const userSchema = new Schema({
    name: {
        type: String, 
        required: [true, 'Please fill in your name'],
        minlength: 2,
        trim: true,    
    },
    email: {
        type: String,
        trim: true,
        match: [/.+\@.+\..+/, 'Please use a valid email address'],
        unique: 'You already have an account', 
        required: [true, 'Please fill in your email address']
    },
    password: {
        type: String, 
        minlength: [6, "Please use a password of at least six characters"],
        required: true
    },
    verified: {type: Boolean, default: false},
    createdAt: Date
    
})

userSchema.pre('save', async function (next) {
    try {
        console.log('test')
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(this.password, salt);
        this.password = hashPassword;
        console.log(hashPassword);
        next()
    }catch (err){
        next(err)
    }
    })

const User = mongoose.model('User', userSchema);

module.exports = User
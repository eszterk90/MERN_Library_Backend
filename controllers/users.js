const User = require('../models/user.model')
const Verification = require('../models/verification.model')
const {sendMail} = require('../models/email.model');
require('dotenv').config();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
// const { AxiosError } = require('axios');
const {validationResult} = require('express-validator')


const createUser = (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.send(errors.array().map(err=>err.msg));
    }
    const newUser = req.body;
    User.findOne({email: newUser.email})
        .then(result => {
            if(result) {
                res.json('You already have an account')
            }
            else {
                User.create(newUser).then((createdUser) => {
                    let random = Math.random().toString(36).slice(-8);
                    Verification.create({authId: createdUser._id, secretKey: random})
                    .then(() => {
                        sendMail(createdUser.email, 'verify email', `Hello, This email address: ${createdUser.email} is used to register in Mock Library. To verify your account please click on <a href="https://mock-library.herokuapp.com/user/verify?authId=${createdUser._id}&secretKey=${random}">this link</a>
                        Thanks,
                        Your Library Team.`)
                        .then(result => {res.json('Please, check your emails and verify your email address'); console.log(result)}).catch(error => console.log(error))
                    }).catch(error => console.log(error))
                }).catch(error => res.json(error))
            }
        })
        .catch(err => console.log(err))
}

const verifyEmail = (req, res) => {
    console.log(req.query);
    let url = req.get('origin');
    Verification.findOne(req.query).then((result) => {
        if(result) {
            User.updateOne({_id: result.authId}, {verified: true}).then(() => Verification.deleteOne(result).then((result) => {
                res.writeHead(302, {"location": "https://mern-library-five.vercel.app/"});
                res.end();
            }).catch(err => res.json(err)))
        }
        else {
            console.log('error by verification')
        }
    }).catch(err => console.log(err))
}

const login = (req, res) => {
    let currentUserData = req.body;
    console.log(req.body)
    User.findOne({email: currentUserData.email})
        .then(result => {
            console.log('this is result', result);
        if(result !== null) {
            console.log(result)
            if(result.verified === true) {
                bcrypt.compare(currentUserData.password, result.password, (err, data) => {
                if(data){
                    // const jwtToken = jwt.sign({result}, process.env.session, { algorithm: 'HS256', expiresIn: '1h'});
                    // req.session.token = jwtToken
                    req.session.user=result;
                    req.session.save();
                    res.json({
                        message: 'Password is valid',
                        result,
                        // jwtToken
                        })
                    } else {
                        res.json({message: 'Invalid password'})
                    }
                })
            }
            else {
                res.json({message: 'Verify email'})
            }
                
        }
        else {
            res.json({message: 'Please provide correct email address'})
        }
            
        })
        .catch(err => {
            throw new Error({message:'Please provide correct email address and password'}, {cause: err});
        })
}

const logout = (req, res) => {
    console.log('logout execute')
    req.session.destroy();
    // req.logout();
    res.json('Logged out')
}


module.exports = {createUser, verifyEmail, login, logout}
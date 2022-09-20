const { faker } = require("@faker-js/faker");
// import User from './models/user.model';
const mongoose = require('mongoose');
const User = require("../models/user.model");
require('dotenv').config()

async function seedDB() {
    const uri = process.env.userCollectionLink

    mongoose.connect(uri, {
        useNewUrlParser: true
    });

    try {
        await User.deleteMany({});
        const users = [];

        for(let i = 0; i < 100; i++){
            let user = {
                name: faker.internet.userName(),
                email: faker.internet.email(),
                password: faker.internet.password(),
              };
        
            let newUser = new User(user)
            users.push(newUser);
        
        }

        await User.insertMany(users)

        console.log("Seeds successfully implanted in database");
        mongoose.connection.close();
    } catch (err) {
        console.log(err)
    }
};

seedDB();
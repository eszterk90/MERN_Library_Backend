const express = require('express');
require('dotenv').config();
const app = express();
//Task: Add .env config here so later we can use it
const PORT = process.env.PORT;
const mongoose = require('mongoose');
const cors = require('cors');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const userRouter = require('./routes/user.routes');
const productRouter = require('./routes/product.routes');
const path = require('path');
const {checkLoggedIn} = require('./middleware/authentication')

app.set('trust proxy', 1)

app.use(session({
  secret: process.env.SESSION,
  resave: false,
  saveUninitialized: true,
  cookie: {
    maxAge: 1000*60*60*12,
    secure: true
  },
  proxy: true,
  // store: new MongoStore({

  // })
}));

mongoose.connect(process.env.USER_COLLECTION_LINK)
  .then(() => console.log('My database is connected'))
  .catch(err => console.log(err));


app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.use(cors());

app.use('/', express.static(path.join(__dirname, '../mern_library/client/build')))

app.get('/', (req, res) => {
  res.json('server is running')
})
app.use('/user', userRouter);
app.use('/books', checkLoggedIn, productRouter)

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../mern_library/client/build/index.html'))
})

app.listen(PORT, ()=>{
    console.log(`The Server is running Successfully in ${PORT} .....`);
});
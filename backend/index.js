// declare library
require('dotenv').config();
// you should always make sure to call "express" always at the top
const express = require('express');
const bodyParser = require('body-parser');
const xss = require('xss-clean');
const helmet = require('helmet');
const cors = require('cors');

// make a router
const userRouter = require('./src/router/user.routes');
const foodRecipeRouter = require('./src/router/foodRecipe.routes');
// const port = process.env.PORT;

const app = express();
try {
    // app.use(express.static('public'));
    app.use(express.static('public/img'));
    app.use(cors());
    app.use(bodyParser.json());
    app.use(userRouter);
    app.use(xss());
    app.use(foodRecipeRouter);
    
} catch(err) {
    console.log(err);
}






// run express
app.listen(process.env.PORT, () => {
    console.log(`SERVICE RUNNING ON PORT ${process.env.PORT}`);
});

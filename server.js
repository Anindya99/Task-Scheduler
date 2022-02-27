const express = require('express');
const passport = require("passport");
const path = require('path');
const mongoose= require('mongoose');
//const config=require('config');
const { db_link} = require("./config/config");
const cors = require("cors");
const cron = require('node-cron');
const email= require('./scheduler/email');
//const cookieSession = require("cookie-session");
/* require('dotenv').config();
console.log(process.env) */

const tasks= require('./routes/task.route');

const app = express();

/* app.use(
    cookieSession({name: "__session",keys: ["key1"],sameSite: 'none'})
); */

//body parser middleware
app.use(express.json());

//passport middleware
//app.use(passport.initialize());


app.use(cors());

//cron and email declared above
cron.schedule('* * * * *', () => {
    //console.log('hello')
    email()
 }); 

//connect to mongo
//const db_link= config.get('db_link')
mongoose
    .connect(db_link,{
        useNewUrlParser: true,
    })
    .then(()=> console.log('Mongoose connected...'))
    .catch(err=> console.log(err));

if (process.env.NODE_ENV === 'production') {
        // Set static folder
        app.use(express.static('client/build'));
      
        app.get('*', (req, res) => {
          res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
        });
}
    

app.use('/api/tasks',tasks);
app.use('/api/finduser',require('./routes/users.routes'));
app.use('/api/users/auth',require('./routes/auth.routes'));
app.use('/api/users/Oauth',require('./routes/Oauth.routes'));
app.use((_, res, next) => {
    let err = new Error("Not Found");
    err.status = 404;
    next(err);
});
const port = process.env.PORT || 5000;
app.listen(port, ()=>console.log(`server started at post ${port}`));
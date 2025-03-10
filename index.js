const express = require('express');
const cookieSession = require('cookie-session');
const mongoose = require('mongoose');
const keys = require('./config/keys.js');
const passport = require('passport');
require('./models/Users.js');
require('./services/passport.js');

mongoose.connect(keys.mongoURI);

const app = express();

app.use(cookieSession({
    maxAge: 24*30*60*60*1000, // 30 days
    keys: [keys.cookieKey]
}));
app.use(passport.initialize());
app.use(passport.session());

require('./routes/authRoute.js')(app);

app.get("/",(req,res)=>{
    res.send("Hello World");
});


const PORT = process.env.PORT || 5000;

app.listen(PORT,()=>{
    console.log("Server Started!");
})
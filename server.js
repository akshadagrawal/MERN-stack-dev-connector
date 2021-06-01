const express= require('express');
const mongoose = require('mongoose');
const passport = require('passport');

const users= require('./routes/api/users');
const profile= require('./routes/api/profile');
const posts= require('./routes/api/posts');
const path= require('path');
const mongoURI= require('./config/keys').mongoURI;
const app= express();



//connect to mongoDB
mongoose.connect(mongoURI, { useNewUrlParser: true,useUnifiedTopology: true ,useFindAndModify: false})
    .then(()=> console.log("Database connected "))
    .catch(err=> console.log(err));

//Passport Middleware
app.use(passport.initialize());

//passport config
 require('./config/passport.js')(passport)

//Body -parser
app.use(express.json());

//Setting up routes
app.use('/api/users', users);
app.use('/api/profile', profile);
app.use('/api/posts', posts);

//server static assets if in prod
if(process.env.NODE_ENV === "production"){
    //set static folder
    app.use(express.static('client/build'));

    app.get('*', (req,res) =>{
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}



// connection
const port= process.env.PORT || 6000;
app.listen(port,()=>{
    console.log("Connected"); 
})    
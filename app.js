const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const mongoose =require('mongoose');
const session = require('express-session');
const passport = require('passport')
const passportLocalMongoose = require('passport-local-mongoose');
const e = require('express');

const loggedinUser ='';
const app = express();


app.use(express.static('public'));
app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({extended:true}));
// all this is form the documentation
app.use(session({
    secret: "Our little secret.",
    resave: false,
    saveUninitialized:false
}));

app.use(passport.initialize());
app.use(passport.session());

mongoose.connect('mongodb://localhost:27017/userDB',{useNewUrlParser:true, useUnifiedTopology:true})
mongoose.set('useCreateIndex',true);
const userSchema = new mongoose.Schema ({
    email: String,
    password: String,
    name: String
});

userSchema.plugin(passportLocalMongoose); //to hash and save the password in the mongodb local database

const User =  new mongoose.model('User',userSchema);

passport.use(User.createStrategy());

passport.serializeUser(User.serializeUser()); // creat a cookie and store all the login user info 
passport.deserializeUser(User.deserializeUser());


app.get('/',function (req,res) {
    res.render('home');
});

app.get('/phistory',function (req,res) {
    if(req.isAuthenticated()){
        res.render('phistory',{name: req.user.name});
    }else{
        res.redirect('/login');
    }
});

app.get('/gatepass',function (req,res) {
    if(req.isAuthenticated()){
        res.render('gatepass',{name: req.user.name});
    }else{
        res.redirect('/login');
    }
});

app.get('/classlink',function (req,res) {
    if(req.isAuthenticated()){
        res.render('classlink',{name: req.user.name});
    }else{
        res.redirect('/login');
    }
});

app.get('/payment',function (req,res) {
    if(req.isAuthenticated()){
        res.render('payment',{name: req.user.name});
    }else{
        res.redirect('/login');
    }
});

app.get('/mentor',function (req,res) {
    if(req.isAuthenticated()){
        res.render('mentor',{name: req.user.name});
    }else{
        res.redirect('/login');
    }
});

app.get('/task2',function (req,res) {
    if(req.isAuthenticated()){
        res.render('task2',{name:req.user.name});
    }else{
        res.redirect('/login');
    }
});

app.get('/login',function (req,res) {
    res.render('login');
});

app.get('/register',function (req,res) {
    res.render('register');
});

app.get('/main',function (req,res) {
    //to check if user is logged in
    if(req.isAuthenticated()){
        res.render('main',{name: req.user.name});
    }else{
        res.redirect('/login');
    }
});


app.get('/logout',function (req,res) {//request response
    req.logout();
    res.redirect('/');
});

app.post('/register',function (req,res) {
//passport local monggoose as middleman
    User.register({username: req.body.username ,name: req.body.name}, req.body.password, function(err,user) {//as a javscript object
        if(err){
            console.log(err);
            loggedinUser = req.body.name;
            res.redirect('/register');
            
        } else{
            passport.authenticate("local")(req,res, function () {
                res.redirect('/main');
            });
        }
    });
});

app.post('/login', function (req,res) {

    const user = new User({
        username: req.body.username,
        password: req.body.password
    });

    req.login(user, function (err) { // this method comes from passport
        if (err){
            console.log(err);
        }else{
            passport.authenticate("local")(req,res ,function () {
                res.redirect('/main',);
            })
        }
    })
    
});






app.listen(3000,function () {
    console.log("Server started in port 3000.")
});
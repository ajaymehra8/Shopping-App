const express=require("express");
require("dotenv").config();

const mongoose=require("mongoose");
const path=require("path");
const bodyParser = require('body-parser'); // Require body-parser
const app=express();
const session=require("express-session");;
const passport=require("passport");
const passportLocalMongoose=require("passport-local-mongoose");
var GoogleStrategy = require('passport-google-oauth20').Strategy;
const findOrCreate = require("mongoose-findorcreate");


// Use body-parser middleware to parse JSON and URL-encoded request bodies
app.use(bodyParser.json()); // Parse JSON
app.use(bodyParser.urlencoded({ extended: true })); 

app.set("view engine","ejs");
const port=process.env.PORT||5000;

const staticPath=path.join(__dirname,"../public");
const viewsPath=path.join(__dirname,"../views");

app.set("view engine","ejs");
app.set("views",viewsPath);
app.use(express.static(staticPath));

app.use(session({
    secret: 'Our relattive are dangerous',
    resave: false,
    saveUninitialized: false  
})
);

app.use(passport.initialize());
app.use(passport.session());
//connecting database

mongoose.connect(process.env.CONNECT, {useNewUrlParser:true});

//creating schema


const myUser= new mongoose.Schema({

    email:String,
    password:String,
    googleId:String,
    secret:String
});

myUser.plugin(passportLocalMongoose);
myUser.plugin(findOrCreate);
//learning encryption


//using myUser to make new model

const User=new mongoose.model("User",myUser);

// passport.use(User.createStrategy());

// passport.serializeUser(function(user, cb) {
//     process.nextTick(function() {
//       cb(null, { id: user.id, username: user.username, name: user.name });
//     });
//   });

//   passport.deserializeUser(function(user, cb) {
//     process.nextTick(function() {
//       return cb(null, user);
//     });
//   });


//   passport.use(new GoogleStrategy({
//     clientID: process.env.CLIENT_ID,
//     clientSecret: process.env.CLIENT_SECRET,
//     callbackURL: "http://localhost:5000/auth/google/cart"
//   },
//   function(accessToken, refreshToken, profile, cb) {
//     console.log(profile);
//     User.findOrCreate({ googleId: profile.id }, function (err, user) {
//       return cb(err, user);
//     });
//   }
// ));
//home GET METHOD
app.get("/",(req,res)=>{
    res.render("index.ejs");
});

//google auth
// app.get("/auth/google", passport.authenticate("google",{scope:['profile']}));

// app.get('/auth/google/cart', 
//   passport.authenticate('google', { failureRedirect: '/login' }),
//   function(req, res) {
//     // Successful authentication, redirect to secrets.
//     res.redirect('/cart');
//   });

//   app.get("/logout",(req,res)=>{

//     req.logout(function(err) {
//         if (err) { return next(err);
//        }
//     });
//        res.redirect('/login');
    
    
// })

// app.post("/register",(req,res)=>{
   
//     User.register({ username:req.body.username},req.body.password,function(err,user){
//     if(err){
//      res.redirect("/logIn");
//     } else{
//      passport.authenticate("local")(req,res, ()=>{
//          res.redirect("/cart");
//      });
//     }
//      }
//     );
 
//  });
 
//  app.post("/login",(req,res)=>{
//      const user=new User({
//          username:req.body.username,
//          password:req.body.password
//      });
//      req.login(user,(err)=>{
//          if(err){
//              console.log(err);
 
//          }else{
//              passport.authenticate("local")(req,res, ()=>{
//                  res.redirect("/cart");
//              });        }
//      })
 
//  })
//GETTING IN WHICH BRAND USER CLICKED

app.post("/getBrand",(req,res)=>{
    const brand=req.body.brand;
    if(brand==="globalDesi"){
        res.render("global.ejs");
    }
    if(brand==="fcuk"){
        res.render("fcuk.ejs");
    }
    if(brand==="NAUTICA"){
        res.render("nautica.ejs");
    }
    if(brand==="ALDO"){
        res.render("sneakers.ejs");
    }
    if(brand==="GANT"){
        res.render("mix.ejs");
    }

});

//GETTING IN WHICH CATEGORY USER CLICKED

app.post("/getCategory",(req,res)=>{

    const brand=req.body.category;
    if(brand==="ethenic"){
        res.render("global.ejs");
    }
    if(brand==="summer"){
        res.render("fcuk.ejs");
    }
    if(brand==="casual"){
        res.render("nautica.ejs");
    }
    if(brand==="sneakers"){
        res.render("sneakers.ejs");
    }
    if(brand==="checkStore"){
        res.render("mix.ejs");
    }
   
})

//GETING SELECTED ITEM

app.post("/selectedItem",(req,res)=>{

    res.redirect("/");
})

// /ABOUT METHOD
app.get("/about",(req,res)=>{
    res.redirect("/");
})

// /CART METHOD
app.get("/cart",(req,res)=>{
    res.render("cart.ejs");
})
app.get("/contact",(req,res)=>{
    console.log(req.body.params);

    res.render("contact.ejs");
})

//log in page
app.get("/logIn",(req,res)=>{
    res.render("logIn.ejs");
})
app.get("/signIn",(req,res)=>{
    res.render("signUp.ejs");
})
//LISTEN TO THE PORT
app.listen(port,()=>{
    console.log(`listening on port ${port}`);
})
const express=require("express");
const app=express();
const port=8000;
const cookieParser=require("cookie-parser");
const expressLayouts=require('express-ejs-layouts');
const db=require("./config/mongoose");
const session=require('express-session');
const passport=require('passport');
const passportLocal=require('./config/passport-local-strategy');
const MongoStore=require('connect-mongo')(session);
const sassMiddleWare=require('node-sass-middleware');

app.use(sassMiddleWare({
    src: './assets/scss',
    dest: './assets/css',
    debug:true,
    outputStyle: 'extended',
    prefix: '/css'
}));


app.use(express.urlencoded());
app.use(cookieParser());
app.use(expressLayouts);

app.set("view engine","ejs");
app.set("views","./views");
app.use(express.static("assets"));
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);


app.use(session({
    name: 'codeial',
    secret: 'blahsomething',
    saveUninitialized: false,
    resave: false,
    cookie:{
        maxAge:(100*60*100)
    },
    store: new MongoStore(
        {
            mongooseConnection: db
        },
        function(err){
            console.log(err || "connect mongodb setUp");
        }
    )
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);

app.use("/",require("./routes/index"));

app.listen(port,function(err){
    if(err){
        console.log(`Error in running server:${err}`);
    }
    console.log(`Server is Up and Running:${port}`);
   

});
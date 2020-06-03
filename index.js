const express=require("express");
const app=express();
const port=8000;
const expressLayouts=require('express-ejs-layouts');
const db=require("./config/mongoose");

app.use(expressLayouts);
app.use("/",require("./routes/index"));
app.set("view engine","ejs");
app.set("views","./views");
app.use(express.static("assets"));
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);


app.listen(port,function(err){
    if(err){
        console.log(`Error in running server:${err}`);
    }
    console.log(`Server is Up and Running:${port}`);
   

});
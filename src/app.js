require('dotenv').config();
const express = require("express");
const path = require("path");
const hbs =require("hbs");
//require("./db/conn");
const User = require("./models/usermessage");
const app = express();
const port =process.env.PORT || 7171;
const mongoose = require("mongoose");
const DB ='mongodb+srv://shubham:shubh@m99@cluster0.4tgfm.mongodb.net/mernstacks?retryWrites=true&w=majority';

mongoose.connect(DB,{
    useNewUrlParser:true,
    useCreateIndex:true,
    useUnifiedTopology:true,
    useFindAndModify:false
}).then(() => {
    console.log('connection sussessful');
}).catch((err) => console.log('no connection'));
// setting the path
const staticpath = path.join(__dirname,"../public");
const template_path = path.join(__dirname,"../templates/views");
const  partials_path = path.join(__dirname,"../templates/partials");

//middleware
app.use('/css',express.static(path.join(__dirname,"../node_modules/bootstrap/dist/css")));
app.use('/js',express.static(path.join(__dirname,"../node_modules/bootstrap/dist/js")));
app.use('/jq',express.static(path.join(__dirname,"../node_modules/jquery/dist")));

app.use(express.urlencoded({extended:false}));
app.use(express.static(staticpath));
app.set("view engine", "hbs");
app.set("views",template_path);
hbs.registerPartials(partials_path);

//Router
//app.get(path,callback)

app.get("/" ,(req, res) =>{
    res.render("index");
});
// app.get("/contact" ,(req, res) =>{
//     res.render("contact");
// });

app.post("/contact", async (req, res) =>{
    try {
       // res.send(req.body);
       const userData = new User(req.body);
       await userData.save();
       res.status(201).render("index");
    } catch (error) {
        res.status(500).send(error);
    }
})


// server create
app.listen(port, ()=>{
    console.log(`server is running at port no ${port}`);
})
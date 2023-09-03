// Import packages
const express = require("express");
const path = require('path');
const fs = require("fs");
const bodyparser = require('body-parser');

// Express specific staff
//middlewares
const app = express();
app.use('/static',express.static('static')); // for serving static file
app.use(express.urlencoded());

//mongoose
const mongoose = require('mongoose');
// mongoose.connect('mongodb://127.0.0.1:27017/contactDance')

//mongoose schema
const contactSchema = new mongoose.Schema({
    name: String,
    gender: String, 
    phone: String, 
    age: String, 
    email: String, 
    address: String, 
    desc: String, 
});
const Contact = mongoose.model('Contact', contactSchema);

//PUG related staff
app.set('view engine','pug');//set the template engine as pug
app.set('views', path.join(__dirname,'views'));//set the views directiory

//end-point
app.get("/",(req, res)=>{
    const params = {};
    res.status(200).render('home.pug',params);
});
app.get("/contact",(req, res)=>{
    const params = {};
    res.status(200).render('contact.pug',params);
});

//save on mongodb
app.post("/contact",(req,res)=>{
    var myData = new Contact(req.body);
    myData.save().then(()=>{
        res.send("This item has been saved to Database");
    }).catch(()=>{
        res.status(404).send("Item was not send to Database");
    });
    // res.status(200).render('contact.pug');
});

// save on output.txt
// app.post("/contact",(req,res)=>{
//     // console.log(req.body);
//     name = req.body.name
//     gender = req.body.gender
//     phone = req.body.phone
//     age = req.body.age
//     email = req.body.email
//     address = req.body.address
//     more = req.body.desc
//     let outputToWrite = `the name of the client is ${name},${age} Years old,${gender},Lives in ${address},and phone number ${phone} and email ${email} and ${more}`;
//     fs.writeFileSync('output.txt',outputToWrite);
//     const params = {MESSAGE:'Your form has been submit successfully',content:''};
//     res.status(200).render('contact.pug',params);
// });

//port configuration
//Start the Server
//connection
const port = 80;
app.listen(port,()=>{
    console.log(`The application started successfully on port ${port}`);
});

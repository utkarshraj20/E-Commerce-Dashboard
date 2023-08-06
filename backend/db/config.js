const mongoose = require('mongoose');

mongoose.connect("mongodb+srv://ecom:dashboard@cluster0.vlxpiek.mongodb.net/").then(()=>{
    console.log("connected")
}) ;

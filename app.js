const express = require("express");
const app = express();
const transac = require("./models/transactions.js");
require("dotenv").config();
const PORT = process.env.PORT;
const cors = require("cors");
app.use(express.json());
app.use(cors());

app.get("/", (req, res)=>{
    res.send("<h1>Welcome to the Budget App <h1>")
});
app.get("/transac", (req,res)=>{
    res.json(transac)
});
app.get("/transac/:index", (req,res)=>{
    const {index} = req.params;

    if(transac[index]){
        res.json(transac[index])
    }else{
        res.redirect("*")
    }
})
app.get("*", (req, res)=>{
    res.status(404).json({error: "Page not found"});
});

app.listen(PORT, ()=>{
    console.log(`Listening on port ${PORT}`)
})


module.exports = app;
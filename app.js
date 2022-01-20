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
    if(!transac[index]){
        res.redirect("/*")  
    }else{
        res.json(transac[index])
    }
})

app.post("/transac", (req,res)=>{
    transac.push(req.body)
    res.json(transac[transac.length-1])
})
app.put("/transac/:index", (req,res)=>{
    const {index} = req.params;
    const {date, name, amount, from} = req.body;
    if(!transac[index]){
        res.redirect("/*")
    }
     else if(isNaN(amount)){
        res.status(422).json({
            error: "Please enter a numeric value"
        });
    }
    else if(date && name && amount && from){
        transac[index] = {date, name, amount, from};
        res.json(transac[index])
    } else {
        res.status(422).json({
            error: "Please provide all fields"
        });
    }
});
app.delete("/transac/:index", (req, res)=>{
    const{index} = req.params;
    if(transac[index]){
        let removed = transac.splice(index,1)
        res.json(removed)
    } else {
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
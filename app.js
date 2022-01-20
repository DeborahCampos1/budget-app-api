const express = require("express");
const app = express();
const transactions = require("./models/transactions.js");
require("dotenv").config();
const PORT = process.env.PORT;
const cors = require("cors");
app.use(express.json());
app.use(cors());

app.get("/", (req, res)=>{
    res.send("<h1>Welcome to the Budget App <h1>")
});
app.get("/transactions", (req,res)=>{
    res.json(transactions)
});
app.get("/transactions/:index", (req,res)=>{
    const {index} = req.params;
    if(!transactions[index]){
        res.redirect("/*")  
    }else{
        res.json(transactions[index])
    }
})

app.post("/transactions", (req,res)=>{
    transactions.push(req.body)
    res.json(transactions[transactions.length-1])
})
app.put("/transactions/:index", (req,res)=>{
    const {index} = req.params;
    const {date, name, amount, from} = req.body;
    if(!transactions[index]){
        res.redirect("/*")
    }
     else if(isNaN(amount)){
        res.status(422).json({
            error: "Please enter a numeric value"
        });
    }
    else if(date && name && amount && from){
        transactions[index] = {date, name, amount, from};
        res.json(transactions[index])
    } else {
        res.status(422).json({
            error: "Please provide all fields"
        });
    }
});
app.delete("/transactions/:index", (req, res)=>{
    const{index} = req.params;
    if(transactions[index]){
        let removed = transactions.splice(index,1)
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
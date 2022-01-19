const express = require("express");
const app = express();
require("dotenv").config();
const PORT = process.env.PORT;
const cors = require("cors");
app.use(express.json());

app.get("/", (req, res)=>{
    res.send("<h1>Welcome to our bookmarks app<h1>")
});
app.get("*", (req, res)=>{
    res.status(404).json({error: "Page not found"});
});


app.listen(PORT, ()=>{
    console.log(`Listening on port ${PORT}`)
})


module.exports = app;
const cookieParser = require("cookie-parser");
const express = require("express");

require("dotenv").config;

const app = express(); //initialize express

//Middlewares (regular)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Cookie Middleware
app.use(cookieParser());

//Importing Routers
const pharmacyRouter = require("./routes/pharmacyRoutes")

//middleware
app.use("/pharmacy", pharmacyRouter); 


//HTTP Requests
app.get("/", (req, res) => {
  res.send("Hi there! Welcome to our Platform");
});

//Server Listening
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

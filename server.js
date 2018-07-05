const express = require("express"),
      mongoose = require("mongoose"),
      passport = require("passport"),
      bodyParser = require("body-parser"),
      app     = express();

// connecting to mongoose
const mongooseURI = require("./config/keys").mongooseURI;
mongoose.connect("mongodb://localhost:27017/nirmal")
.then( () => {
    console.log("connected");
})
.catch(err => {
    console.log(err);
    
});

// body parser config
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

// passport js config
require("./config/passport")(passport);

// Routes
const authRoutes = require("./routes/auth"),
      adminRoutes = require("./routes/admin");

app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);

const PORT = process.env.PORT ||5000;

app.listen(PORT, () => {
    console.log("the magic is happening at port " ,PORT);
});

const express = require ("express");
const app = express();

const db = require("./models");

//Routers
const formRouter = require('./routes/forms');
app.use("/forms",formRouter);



db.sequelize.sync().then(() => {
    app.listen(3001,()=>{
        console.log("Server running on port 3001");
    });
});


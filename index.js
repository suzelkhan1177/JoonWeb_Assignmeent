const express = require('express');
const bodyParser = require('body-parser');
 require('./config/mysql');
 require('dotenv').config();

const app = express();
app.use(bodyParser.json());

app.use(express.urlencoded()); // help in making  POST Api calls


// routers
app.use("/", require("./controllers/User"));

app.listen(3000, (err) => {
  if (err) {
    console.log("Error in Server Runing", err);
    return;
  }
  console.log('Server started on port 3000');
});

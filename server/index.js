const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
const routes = require("./routes/index");
const MONGODB_URI =process.env.MONGODB_URI;

const app = express();
app.use(express.json());
app.use(bodyParser.json({limit : "25mb"}));
app.use(bodyParser.urlencoded({extended: true, limit : "25mb"}));
app.use(cors());
app.use("/",routes);

mongoose.connect(MONGODB_URI).then(result => {
  console.log('App is listening on url http://localhost:' + process.env.PORT);
  app.listen(process.env.PORT||5000); 
})
.catch(err => console.log(err));

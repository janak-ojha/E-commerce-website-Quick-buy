const express = require('express');
const mongoose = require("mongoose");
const cors = require('cors');
const app = express();
const dotenv= require("dotenv");
dotenv.config();

app.use(express.json({ limit: "10mb" })); // to get data from the frontend
app.use(cors());// Middleware to allow cross-origin requests
app.use(express.urlencoded({ extended: true }));

mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }).then(() => {
    console.log("Mongodb connected");
  }).catch(() => {
    console.log("Not connected to the Mongodb");
  });


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
  });

#!/usr/bin/env node

import app from "../app.js";
import connectDB from "../db/connect.js";
import dotenv from 'dotenv';
dotenv.config();

const port = process.env.PORT || 6000;


const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL);

    app.listen(port, () => {
      console.log(`Server is listening on port ${port}...`);
    })

  } catch (err) {
    console.log(err);
  }
};

start();



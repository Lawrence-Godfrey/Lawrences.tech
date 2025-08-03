#!/usr/bin/env node

import app from "../app.js";
import connectDB from "../db/connect.js";
import dotenv from 'dotenv';
dotenv.config();

const port = process.env.PORT || 6000;


const start = async () => {
  // Start HTTP server first
  app.listen(port, () => {
    console.log(`Server is listening on port ${port}...`);
  });

  // Connect to database with retry logic
  try {
    await connectDB(process.env.MONGO_URL);
    console.log('Database connected successfully');
  } catch (err) {
    console.log(`Error: Error connecting to db: ${err.message}`);
    console.log(err);
    // Server continues running even if DB connection fails
  }
};

start();



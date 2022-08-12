#!/usr/bin/env node

import app from "../app";
import connectDB from "../db/connect";

const port = process.env.PORT || 5000;


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

start().then(
    () => console.log(`Server is listening on port ${port}...`)
);



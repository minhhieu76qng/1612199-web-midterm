const mongoose = require("mongoose");

const CONNECTION_STRING = process.env.CONNECTION_STRING || 'mongodb://localhost:27017/test';

// for cloud
mongoose
  .connect(
    CONNECTION_STRING,
    {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
      useFindAndModify: false
    }
  )
  .then(() => {
    console.log("MongoDB connected...");
  })
  .catch(err => {
    throw new Error(err);
  });
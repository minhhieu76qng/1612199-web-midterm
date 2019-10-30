const mongoose = require("mongoose");

const { DATABASE_NAME, USER, PW } = process.env;

// for cloud
mongoose
  .connect(
    `mongodb+srv://${USER}:${PW}@web-midterm-m7ztw.mongodb.net/${DATABASE_NAME}?retryWrites=true&w=majority`,
    {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true
    }
  )
  .catch(err => {
    throw new Error(err);
  });

//// for localhost
// mongoose.connect(`mongodb://localhost:27017/${DATABASE_NAME}`, {
//   useNewUrlParser: true,
//   useCreateIndex: true,
//   useUnifiedTopology: true
// })

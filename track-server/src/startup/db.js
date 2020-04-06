const mongoose = require("mongoose");

const mongoUri =
  "mongodb+srv://admin:passwordpassword@tracker-rhde0.mongodb.net/test?retryWrites=true&w=majority";

module.exports = function() {
  mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
  });

  mongoose.connection.on("connected", () => {
    console.log("Connected to mongo instance");
  });

  mongoose.connection.on("error", err => {
    console.error("Error connecting to mongodb", err);
  });
};

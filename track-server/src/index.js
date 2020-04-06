const express = require("express");
const app = express();

require("./startup/routes")(app);
require("./startup/db")();

app.listen(3000, () => {
  console.log("Listening on port 3000");
});

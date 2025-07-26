require("dotenv").config();

const mongoose = require("mongoose");

const app = require("./app");
const PORT = process.env.PORT || 8080;

mongoose
  .connect(process.env.DB_URI)
  .then(() => {
    console.log("Connected to database.");

    // Listen for requests
    app.listen(PORT, () => {
      console.log(`Server is live and listening on port ${PORT}.`);
    });
  })
  .catch((err) => console.log(err));

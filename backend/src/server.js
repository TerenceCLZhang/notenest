const mongoose = require("mongoose");

const app = require("./app");
const PORT = 8080;

// Connect to database
const DB_URI = `mongodb+srv://terencezhang:${process.env.MONGO_ATLAS_PASSWORD}@personal-notes-app.zayv1ve.mongodb.net/app?retryWrites=true&w=majority&appName=personal-notes-app`;
mongoose
  .connect(DB_URI)
  .then(() => {
    console.log("Connected to database.");

    // Listen for requests
    app.listen(PORT, () => {
      console.log(`Server is live and listening on port ${PORT}.`);
    });
  })
  .catch((err) => console.log(err));

const express = require("express");
const app = express();
const port = 5000;
const mongoDB = require("./database/db");

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With,Content-Type,Accept"
  );
  next();
});

mongoDB();
app.use(express.json());
app.use("/api", require("./routes/signup"));
app.use("/api", require("./routes/login"));

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

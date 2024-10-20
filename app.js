const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const port = process.env.PORT || 8000;
const documentRoute = require("./routes/documentsRoute");
const sectionRouter = require("./routes/sectionsRoute");
const userRouter = require("./routes/userRoute");
const { join } = require("path");
const compression = require("compression");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const viewRouter = require("./routes/viewRoute");
dotenv.config();
const db = process.env.DB.replace("<db_password>", process.env.DB_PASSWORD);
app.use(express.json());
app.set("view engine", "pug");
app.set("views", join(__dirname, "public"));
mongoose
  .connect(db)
  .then(() => {
    console.log("connected to our db");
  })
  .catch((err) => {
    {
      console.log("db connection error: ", err);
    }
  });
app.use(cookieParser());
app.use(compression());

app.use("/", viewRouter);
app.use("/api/documents", documentRoute);
app.use("/api/sections", sectionRouter);

app.all("*", (req, res, next) => {
  res.send("this route is not defined!");
});

app.use((err, req, res, next) => {
  const error = err;
  // Token Expiration
  if (err.name === "TokenExpiredError") {
    error.message = "please Login Again!";
  }
  res.json(error);
});

app.listen(port, () => {
  console.log("app runing on port 5000");
});
// process.on("unhandledRejection", (err) => {
//   server.close(err);
// });

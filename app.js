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
dotenv.config();

const db = process.env.db.replace("<db_password>", process.env.db_password);
app.use(express.json());
app.set("view engine", "ejs");
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
app.get("/", (req, res) => {
  res.render("base", {
    page: "home page",
  });
});
app.use(cors({ origin: "https://localhost:5173" }));
app.use(cookieParser());
app.use((req, res, next) => {
  // console.log(res.cookie);
  next();
});
app.use(compression());
app.use("/api/users", userRouter);
app.use("/api/documents/", documentRoute);
app.use("/api/sections/", sectionRouter);

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

require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const authRouter = require("./routes/authRoute");
const userRouter = require("./routes/userRoute");
const animalRouter = require("./routes/animalRoute");
const authenticate = require("./middlewares/authenticate");
const distributorRouter = require("./routes/distributorRoute");

// const { sequelize } = require("./models");
// sequelize
//   .sync({ force: true })
//   .then(() => console.log("DB synced!"))
//   .catch((err) => console.log(err));

const app = express();
app.use(cors());

if ((process.env.NODE_ENV = "development")) {
  app.use(morgan("dev"));
}

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/auth", authRouter);
app.use("/users", authenticate, userRouter);
app.use("/animals", authenticate, animalRouter);
app.use("/distributor", authenticate, distributorRouter);

const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log("Server running on port: " + port);
});

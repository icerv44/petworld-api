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
app.use("/animals", animalRouter);
app.use("/distributor", authenticate, distributorRouter);

const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log("Server running on port: " + port);
});

const order = [
  {
    id: 1,
    price: 22,
    deliveryFee: 10,
    distance: 10,
    status: "DELIVERY_PENDING",
    customerLatitude: "100",
    customerLongitude: "100",
    addressName: "home",
    createdAt: "2022-06-29T09:52:54.000Z",
    updatedAt: "2022-06-29T09:52:54.000Z",
    customerId: 1,
    driverId: 1,
    restaurantId: 1,
    Restaurant: {
      id: 1,
      name: "Siam Restaurant",
      status: "close",
      email: "siamRestaurant@gmail.com",
      password: "$2a$10$6VVLjzxhP7r9OtL7FpG/Auhn6PYwyoOeULtZLZGnW..qYqE8WmcZa",
      image:
        "https://a.cdn-hotels.com/gdcs/production1/d32/f93e1d15-b49b-4699-8904-06f8074f0f35.jpg",
      imagePublicId: "none",
      phoneNumber: "0822225555",
      latitude: "100",
      longitude: "100",
      createdAt: "2022-06-29T09:52:54.000Z",
      updatedAt: "2022-06-29T09:52:54.000Z",
    },
    OrderMenus: [
      {
        id: 2,
        price: 12,
        name: "thai green curry",
        comment: "comment thai green curry",
        createdAt: "2022-06-29T09:52:54.000Z",
        updatedAt: "2022-06-29T09:52:54.000Z",
        menuId: 3,
        orderId: 1,
      },
      {
        id: 1,
        price: 10,
        name: "pad thai",
        comment: "comment pad thai",
        createdAt: "2022-06-29T09:52:54.000Z",
        updatedAt: "2022-06-29T09:52:54.000Z",
        menuId: 1,
        orderId: 1,
      },
    ],
  },
  {
    id: 2,
    price: null,
    deliveryFee: 10,
    distance: 10,
    status: "IN_CART",
    customerLatitude: "100",
    customerLongitude: "300",
    addressName: "home",
    createdAt: "2022-06-29T09:52:54.000Z",
    updatedAt: "2022-06-29T09:52:54.000Z",
    customerId: 2,
    driverId: 2,
    restaurantId: 2,
    Restaurant: {
      id: 2,
      name: "French Restaurant",
      status: "close",
      email: "frenchRestaurant@gmail.com",
      password: "$2a$10$6VVLjzxhP7r9OtL7FpG/Auhn6PYwyoOeULtZLZGnW..qYqE8WmcZa",
      image:
        "https://cdn.vox-cdn.com/thumbor/EKrsctH4FQDbuUKic89L3tiWULc=/0x0:1700x960/1200x800/filters:focal(714x344:986x616)/cdn.vox-cdn.com/uploads/chorus_image/image/69525497/restaurant_01_6b56e1a4.0.jpg",
      imagePublicId: "none",
      phoneNumber: "0822224444",
      latitude: "101",
      longitude: "100",
      createdAt: "2022-06-29T09:52:54.000Z",
      updatedAt: "2022-06-29T09:52:54.000Z",
    },
    OrderMenus: [
      {
        id: 4,
        price: null,
        name: null,
        comment: "comment Andre",
        createdAt: "2022-06-29T09:52:54.000Z",
        updatedAt: "2022-06-29T09:52:54.000Z",
        menuId: 5,
        orderId: 2,
      },
      {
        id: 3,
        price: null,
        name: null,
        comment: "comment croissant",
        createdAt: "2022-06-29T09:52:54.000Z",
        updatedAt: "2022-06-29T09:52:54.000Z",
        menuId: 4,
        orderId: 2,
      },
    ],
  },
];

console.log("order : ", order.Restaurant);

// import express from "express";
// import cookieParser from "cookie-parser";
// import cors from "cors";
// import http from "http";
// import mongoose from "mongoose";
// import "dotenv/config";
// import routes from "./src/routes/index.js";

// const app = express();

// app.use(cors());
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());

// app.use("/api/v1", routes);

// const port = process.env.PORT || 5000;

// const server = http.createServer(app);

// mongoose.connect(process.env.MONGODB_URL).then(() => {
//   console.log("Mongodb connected");
//   server.listen(port, () => {
//     console.log(`Server is listening on port ${port}`);
//   });
// }).catch((err) => {
//   console.log({ err });
//   process.exit(1);
// });

// index.js
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import routes from "./src/routes/index.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/api/v1", routes);

// Load .env file and handle errors
try {
  dotenv.config();
} catch (err) {
  console.error(err);
}

// Connect to MongoDB and handle errors
mongoose.connect(process.env.MONGODB_URL).then(() => {
  console.log("Mongodb connected");
}).catch((err) => {
  console.error(err);
});

// Use a custom error handler middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong!");
});

const port = process.env.PORT || 5000;

// Start the server without using http module
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});

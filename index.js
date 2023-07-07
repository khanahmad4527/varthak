const express = require("express");
const cors = require("cors");
const { connection } = require("./config/db");
const { router } = require("./routes/routes");
const expressWinston = require("express-winston");
const winston = require("winston");
require("winston-mongodb");
require("dotenv").config();

const app = express();

app.use(cors());

app.use(express.json());

app.use(
  expressWinston.logger({
    transports: [
      new winston.transports.Console({
        json: true,
        colorize: true,
        level: "info",
      }),

      new winston.transports.File({
        level: "info",
        filename: "infologs.log",
      }),

      new winston.transports.MongoDB({
        db: process.env.mongoDBLogs,
        level: "info",
      }),
    ],
    format: winston.format.prettyPrint(),
  })
);

app.use("/", router);

const PORT = process.env.PORT || 8080;

app.listen(PORT, async () => {
  try {
    await connection;
    console.log("Connected to mongoDB");
  } catch (error) {
    console.log("Unable to connect with mongoDB");
  }
  console.log(`Listening to server on PORT ${PORT}`);
});

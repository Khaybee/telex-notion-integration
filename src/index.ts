// Import express
import express from "express";
import env from "dotenv";
env.config();
import cors from "cors";
import bodyParser from "body-parser";
import telexRouter from "./telex/routes";
import notionRouter from "./notion/routes";
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

app.use('/integration.json', telexRouter);
app.use('/tick', notionRouter);

// Define a route
app.get("/api/v1/", (req, res) => {
  res.send("Hello, Bot user!");
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

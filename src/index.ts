// Import express
import express from "express";
import env from "dotenv";
env.config();
import cors from "cors";
import bodyParser from "body-parser";
import telexRouter from "./telex/routes";
import notionRouter from "./notion/routes";
import { validateConfig } from "./global/config";
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

try {
  validateConfig();
  console.log('Configuration validated successfully');
} catch (error: any) {
  console.error('Configuration error:', error.message);
  process.exit(1); // Exit the application if config is invalid
}

app.use('/integration.json', telexRouter);
app.use('/notion-updates', notionRouter);

// Define a route
app.get("/", (req, res) => {
  res.send("Hello, Bot user!");
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

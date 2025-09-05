// index.js
const express = require('express');
const app = express();
const cors = require("cors");
const route = require("./routes");
const connectDB = require('./db');
connectDB();

// Middleware to parse JSON requests
app.use(express.json());

// Enable CORS
app.use(cors());
// app.options("/*", cors());

app.use(route);

// Test route


// Start server
const PORT = process.env.PORT || 6010;
const HOST = process.env.HOST || 'localhost';
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
app.listen(PORT, HOST, function (err) {
      if (err) {
        console.log("Failed to start the server " + err);
      }
      console.log(
        "Clinic-Admin Module is running on http://" +
          HOST +
          ":" +
          PORT
      );
    });

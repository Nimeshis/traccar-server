const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require('body-parser'); // Add this line

const app = express();
app.use(cors());

// Configure MongoDB URI
const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://localhost:27017/Traccar";

// Connect to MongoDB
mongoose
  .connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

// Use body-parser middleware to parse request bodies
app.use(bodyParser.json());

//routes
const counterRoutes = require("./routes/CounterRoute");
const companyRoutes = require("./routes/CompanyRoute");
const driverRoutes = require("./routes/DriverRoute");
const locationRoutes = require('./routes/LocationRoute');

//models
app.use("/company", companyRoutes);
app.use("/counter", counterRoutes);
app.use("/driver", driverRoutes);

// Use '/locations' for the location routes
app.use("/locations", locationRoutes);

// PORT
const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server is running on PORT: ${PORT}`);
});

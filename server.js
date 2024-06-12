const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

// Use body-parser middleware to parse request bodies
app.use(bodyParser.json());

// Allow all origins (for development purposes)
app.use(cors());

// Configure MongoDB URI
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/Traccar";

// Connect to MongoDB
mongoose.connect(MONGODB_URI, {
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

// Routes
const counterRoutes = require('./routes/CounterRoute');
const companyRoutes = require('./routes/General/CompanyRoute');
const driverRoutes = require('./routes/General/DriverRoute');
const locationRoutes = require('./routes/LocationRoute');

// Use routes
app.use('/company', companyRoutes);
app.use('/counter', counterRoutes);
app.use('/driver', driverRoutes);
app.use('/locations', locationRoutes);

// PORT
const PORT = process.env.PORT || 3002;

// Server listening
app.listen(PORT, '0.0.0.0', () => {  // Make sure the server listens on all network interfaces
  console.log(`Server is running on PORT: ${PORT}`);
});

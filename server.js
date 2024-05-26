const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const allowedOrigins = process.env.CORS_ORIGIN || ["http://localhost:3000"];
app.use(
  cors({
    origin: allowedOrigins,
  })
);

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

//routes
const CounterRoutes = require("./routes/CounterRoute");
const CompanyRoutes = require("./routes/CompanyRoute");

//models
app.use("/company", CompanyRoutes);
app.use("/counter", CounterRoutes);

// PORT
const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server is running on PORT: ${PORT}`);
});

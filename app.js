const express = require("express");
const shakeDatabase = require("./connection/database");
const swaggerUI = require("swagger-ui-express");
const swaggerSpec = require("./swagger.docs");
const cors = require('cors');
const bodyParser = require('body-parser');


require("dotenv").config();

const app = express();
const allowedOrigins = ['http://localhost:3000', "https://coperative.onrender.com/api/v1"];

// Custom CORS middleware
const customCorsMiddleware = (req, res, next) => {
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }
  res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  // Handle pre-flight requests
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
};

app.use(customCorsMiddleware);
app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({ extended: true }));





const { PORT } = process.env;

app.use(express.json());


app.use("/api/v1/user", require("./routes/userRoute"));

app.use("/api/v1/wallet", require("./routes/walletRoute"));

app.use("/api/v1/admin", require("./routes/adminRoute"));

//app.use("/api/v1", require("./routes/consultationRoute"));



// SWAGGER
app.use("/docs", swaggerUI.serve, swaggerUI.setup(swaggerSpec));

app.get("/", async (req, res) => {
  res
    .status(200)
    .json({
      message: `Welcome to Our amazing pet store; Explore our API docs at http://localhost:${PORT}/docs`
    });
});



// SHAKE DATABASE
shakeDatabase(() => {
  // Start the server after database successful handshake
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
});

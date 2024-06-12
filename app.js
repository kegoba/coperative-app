const express = require("express");
const shakeDatabase = require("./connection/database");
const swaggerUI = require("swagger-ui-express");
const swaggerSpec = require("./swagger.docs");
const cors = require('cors');
const bodyParser = require('body-parser');


require("dotenv").config();

const app = express();
const allowedOrigins = ['https://coperativeapp.onrender.com', 'http://localhost:3000'];

const corsOptions = {
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) {
      // If the origin is in the allowedOrigins list, allow the request
      return callback(null, true);
    } else {
      // If the origin is not in the list, deny the request
      return callback(new Error('Not allowed by CORS'));
    }
  },
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  allowedHeaders: 'Content-Type, Authorization'
};

app.use(cors(corsOptions));

// Handle preflight requests
app.options('*', cors(corsOptions));



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
app.use(express.static('./build'));
app.get("/", async (req, res) => {
  res
    .status(200)
    .json({
      message: `Welcome to Our amazing pet store; Explore our API docs at http://localhost:${PORT}/docs`
    });
});


app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});



// SHAKE DATABASE
shakeDatabase(() => {
  // Start the server after database successful handshake
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
});

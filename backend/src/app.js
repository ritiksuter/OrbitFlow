import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import router from './routes/index.js';

const app = express();

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
    methods: ["GET", "POST", "DELETE", "PUT"],
    allowedHeaders: ["Content-Type", "Authorization"],
}));

app.use(morgan("dev"));
app.use(express.json({limit: "16kb"}));
app.use(express.urlencoded({extended: true, limit: "16kb"}));
app.use(express.static("public"));
app.use(cookieParser());



// Routes will be imported here ->


app.get("/", async (req, res) => {
  res.status(200).json({message: "Welcome to Project Manager App"});
});

app.use("/api-v1", router);


// error middleware
app.use((err, req, res, next) => {
  console.log(err.stack);
  res.status(500).json({ message: "Internal server error" });
});


// not found middleware
app.use((req, res) => {
  res.status(404).json({
    message: "Not found",
  });
});


export {app};
import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import session from "express-session"
import db from "./config/Database.js"
import UserRoute from "./routes/UserRoute.js"

dotenv.config();

// (async()=>{
//   await db.sync();
// })();

const app = express();

app.use(session({
  secret: process.env.SESS_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: {
    secure: "auto"
  }
}));

app.use(cors({
  credentials: true,
  origin: 'http://http://localhost:5173'
}));

app.use(express.json());
app.use(UserRoute);

app.listen(process.env.APP_PORT, () => {
  console.log(`Server uppss...`);
});


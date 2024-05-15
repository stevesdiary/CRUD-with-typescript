require('dotenv').config();
import express from "express";
import { connectDb } from "./db/dbConnection";
import router from './routes/employee';
const app = express();
app.use(express.json());

connectDb();
app.use('/', router);

app.listen(4000, () => {
  console.log("App running on port 4000")
});

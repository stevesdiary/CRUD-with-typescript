require('dotenv').config();
import express from "express";
import mongoose from "mongoose";
import router from './routes/employee';
const app = express();
app.use(express.json());

if (!process.env.DB_URL) {
  console.error('MONGODB_URI environment variable is not defined.');
  process.exit(1);
}
const mongo_url: string = process.env.DB_URL
mongoose.connect(mongo_url, {
  dbName: 'Cluster0',
})
  .then(() => {
    console.log("Database connected!");
  })
  .catch((error) => console.log(error)
);

app.use('/', router);

app.listen(4000, () => {
  console.log("App running on port 4000")
});

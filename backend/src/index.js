import { app } from "./app.js";
import { connectDb } from "./db/connectDB.js";

connectDb()
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`Server running on port ${process.env.PORT}🌞`);
    });
  })
  .catch((error) => {
    console.log(`Error while connecting to DATABASE ${error}❌`);
  });

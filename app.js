import express from "express";
import { PORT, MONGOURL } from "./config";
import { createConnectionAndInitialize } from "./models";
import errorHandler from "./middlewares/errorHandler";
import { router } from "./routes";
const app = express();

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static("upload"));

//connect db
createConnectionAndInitialize(MONGOURL)
  .then()
  .catch((err) => {
    logger.error(err);
    process.exit(1);
  });

//main route import
app.use("/api/v1", router);
app.use(errorHandler);
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

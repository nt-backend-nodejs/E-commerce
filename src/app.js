import express from "express";
import morgan from "morgan";
// import { userRouter } from "./routes/index.js";
// import { createUserTable } from "./schema/index.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

// app.use("/user" /*userRouter*/);
// app.use("/whishlist" /* whishlistRouter */);

app.get("/setup", async (req, res) => {
  await createUserTable();
  // await createWhishlistTable()

  res.send("ok");
});

export default app;

import express from "express";
import morgan from "morgan";
import {
  addressRouter,
  categoryRouter,
  productRouter,
  social_ProfileRouter,
  userRouter,
  whishlistrouter
} from "./routes/index.js";
import {
  createAddressTable,
  createUserTable,
  createSocProfilesTable,
  createCategoryTable,
  createProductTable,
} from "./schema/index.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

app.use("/user", userRouter);
app.use("/address", addressRouter);
app.use("/social_profile", social_ProfileRouter);
app.use("/category", categoryRouter);
app.use("/product", productRouter);
app.use("/whishlist", whishlistrouter);

app.get("/api/v1/setup", async (req, res) => {
  await createUserTable();
  await createAddressTable();
  await createSocProfilesTable();
  await createCategoryTable();
  await createProductTable();

  res.send("ok");
});

export default app;
import { DataSource } from "typeorm";
import { Country } from "./models/Country.js";

const AppDataSource = new DataSource({
  type: "sqlite",
  database: "./db.sql",
  entities: [Country],
  synchronize: true,
});

AppDataSource.initialize()
  .then((d) => {
    console.log("Data Source has been initialized!");
    return d;
  })
  .catch((err) => {
    console.error("Error during Data Source initialization", err);
  });

export default AppDataSource;

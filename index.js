const mongoose = require("mongoose")
const dotenv = require("dotenv")

console.log(app.get("env"))
dotenv.config({ path: "./.env" })

const DB = process.env["DATABASE"].replace("<PASSWORD>", process.env["DATABASE_PASSWORD"])
const localDB = process.env["DATABASE_LOCAL"]
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
  })
  .then((connect) => {
    console.log(connect.connection)
    console.log("Database connection successful.")
  })

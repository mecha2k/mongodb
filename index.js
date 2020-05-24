const mongoose = require("mongoose")
const dotenv = require("dotenv")

const app = require("./app")

dotenv.config({ path: "./.env" })

const DB = process.env.DATABASE_LOCAL
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
  })
  .then((connect) => {
    // console.log(connect.connection)
    console.log("Database connection successful.")
  })

const personschema = mongoose.Schema({
  name: { type: String, unique: true, required: [true, "A name must be provided"] },
  age: Number
  // stories: [{ type: mongoose.Schema.ObjectId, ref: "Story" }]
})

const storyschema = mongoose.Schema({
  // author: { type: mongoose.Schema.ObjectId, ref: "Person" },
  title: { type: String, required: [true, "A title must be provided"] }
  // fans: [{ type: mongoose.Schema.ObjectId, ref: "Person" }]
})

const Story = mongoose.model("stories", storyschema)
const User = mongoose.model("users", personschema)

const author = new User({ name: "Ian Fleming", age: 50 })

// Person.create(author)
//   .then((doc) => console.log(doc))
//   .catch((err) => console.log(err))

author
  .save()
  .then((doc) => console.log(doc))
  .catch((err) => console.log(err))

// const story1 = new Story({
//   title: "Casino Royale",
//   author: author._id
// })
//
// story1.save(function(err) {
//   if (err) return console.log(err)
// })

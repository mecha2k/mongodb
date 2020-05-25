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
  age: { type: Number, required: true },
  stories: [{ type: mongoose.Schema.ObjectId, ref: "Stories" }]
})

const storyschema = mongoose.Schema({
  author: { type: mongoose.Schema.ObjectId, ref: "Users" },
  title: { type: String, required: [true, "A title must be provided"] },
  fans: [{ type: mongoose.Schema.ObjectId, ref: "Users" }]
})

const Story = mongoose.model("Stories", storyschema)
const User = mongoose.model("Users", personschema)

const author1 = new User({ name: "mecha2k", age: 52 })

author1
  .save()
  .then(function (doc) {
    console.log(doc)

    const story1 = new Story({ title: "Casino Royale", author: author1._id })
    story1
      .save()
      .then((doc) => console.log(doc))
      .catch((err) => console.log(err))
  })
  .catch((err) => console.log(err))

Story.findOne({ title: "Casino Royale" })
  .populate("author")
  .exec(function (err, story) {
    if (err) return console.log(err)
    console.log("The author is %s", story.author.name)
    console.log(story)
  })

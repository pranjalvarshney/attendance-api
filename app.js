require("dotenv").config()
const express = require("express")
const morgan = require("morgan")
const app = express()
const mongoose = require("mongoose")

app.use(morgan("dev"))
app.use(express.json())
app.use("/api", require("./routes/attendance"))
app.use("/api", require("./routes/portal"))

app.get("/", (req, res) => {
  res.send("yo buddy")
})
// console.log(process.env.MONGO_PASSWORD)
// console.log(process.env.MONGO_ADMIN)
const uri = `mongodb+srv://${process.env.MONGO_ADMIN}:${process.env.MONGO_PASSWORD}@cluster0.ikxbe.mongodb.net/<dbname>?retryWrites=true&w=majority`

mongoose.connect(
  uri,
  {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err, response) => {
    if (err) {
      console.log(err)
    }
    console.log("MongoDB connected successfully")
  }
)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server started on ${PORT}`)
})

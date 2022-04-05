import express from "express"
import routes from "./routes/index.js"
import handleErrors from "./api-utils/handleError.js"

const app = express()
const PORT = process.env.PORT || 5000

app.use(express.json())

app.use("/api/v1", routes)

app.use(handleErrors)

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}`)
})

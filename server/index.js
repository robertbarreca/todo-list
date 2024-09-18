require("dotenv").config()
const express = require("express")
const { connectToMongoDb } = require("./database")
const path = require("path")

const app = express()
app.use(express.json())

app.use(express.static(path.join(__dirname, "build")))
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "build/index.html"))
})

const router = require("./routes")
// use /api to prefix endpoints
app.use("/api", router)

// create a port var
const port = process.env.PORT || 5005

async function startServer() {
    await connectToMongoDb()
    // listen to server on local host
    app.listen(port, () => {
    console.log(`Server is listening on http://localhost:${port}`)
    })
}

startServer()




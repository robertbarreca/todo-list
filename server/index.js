const express = require("express")

const app = express()

const router = require("./routes")
// use /api to prefix endpoints
app.use("/api", router)

// create a port var
const port = 5005

// listen to server on local host
app.listen(port, () => {
    console.log(`Server is listening on http://localhost:${port}`)
})


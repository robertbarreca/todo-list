const express = require("express")

const app = express()

// create a test router
app.get("/hello", (req, res) => {
    res.status(200).json({msg: "hello"})
})

// create a port var
const port = 5005

// listen to server on local host
app.listen(port, () => {
    console.log(`Server is listening on http://localhost:${port}`)
})


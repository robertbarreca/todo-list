const express = require("express")

// create an instance of our router
const router = express.Router()

// get todos
router.get("/todos", (req, res) => {
    res.status(200).json({"msg":"GET REQUEST TO api/todos"})
})
// post todos
router.post("/todos", (req, res) => {
    res.status(201).json({"msg":"POST REQUEST TO api/todos"})
})
// delete todos id
router.delete("/todos/:id", (req, res) => {
    res.status(200).json({"msg":"DELETE REQUEST TO api/todos/:id"})
})
// put todos id
router.put("/todos/:id", (req, res) => {
    res.status(200).json({"msg":"PUT REQUEST TO api/todos/:id"})
})

module.exports = router

const express = require("express");
const axios = require("axios");
const router = express.Router();

router.get("/test", (req, res) => {
    axios.get("https://dummy.restapiexample.com/api/v1/employees")
       .then(response => res.json(response.data))
       .catch(err => res.json(err));
})
router.post("/newEmployee/", (req, res) => {
    axios.post("https://dummy.restapiexample.com/api/v1/create/")
       .then(response => res.json(response.data))
       .catch(err => res.json(err));
})
router.delete("/delEmployee/", (req, res) => {
    axios.delete("https://dummy.restapiexample.com/api/v1/delete/2")
       .then(response => res.json(response.data))
       .catch(err => res.json(err));
})
router.get("/testid", (req, res) => {
    axios.get("https://dummy.restapiexample.com/api/v1/employee/1")
       .then(response => res.json(response.data))
       .catch(err => res.json(err));
})
module.exports = router;
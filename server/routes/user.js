const express = require("express");
const {register , login , setAvatar} = require("../controllers/user");

const router = express.Router();

router.post("/register" , register);
router.post("/login" , login);
router.post("/setAvatar/:id" , setAvatar);
router.get("/allusers/:id" , allusers)
module.exports = router;
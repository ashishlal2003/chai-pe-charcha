const express = require("express");
const {addMsg , getAllMsgs} = require("../controllers/messages");

const router = express.Router();

router.post("/addMsg" , addMsg);
router.get("/getAllMsgs" , getAllMsgs);
module.exports = router;
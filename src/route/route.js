const express = require('express');
const router = express.Router();
const collegeController = require("../controller/collegeController");
const internController = require("../controller/internController");

router.get("/test-me", function(req, res){
    res.send("My first ever api")
});

router.post("/functionup/colleges" , collegeController.createCollege);
router.post("/functionup/interns", internController.createIntern);
router.get("/functionup/collegeDetails", internController.getCollege)


router.all("/**", function(req,res){
    res.status(404).send({msg:" No Such Api Found"})
})

module.exports = router;
const collegeModel = require ("../model/collegeModel");
const {isValid, isValidName, isValidCollegeName, isValidUrl} = require("../validator/validator");

//create college api
const createCollege = async function(req,res){
    let data = req.body;
    let logoI =req.body.logoLink;
    let nameC = req.body.name;

    if (!("name" in data)||!("fullName" in data)||!("logoLink" in data))
    return res.send({status: false, msg: "all details are mandatory(name,fullName,logoLink)"});

    let collegeName=await collegeModel.findOne({nameC})
        if(collegeName) return res.status(400).send({msg:"Duplicate college name"})

    let logo=await collegeModel.findOne({logoI})
        if(logo) return res.status(400).send({msg:"Duplicate Logo"})
        console.log(logo)
    if(!isValid(data.name)) return res.status(400).send({status: false, msg: "name can not be empty"});
    if (!isValidCollegeName(data.name)) return res.status(400).send({ status: false, msg: "collegeName is not valid" });

    // if(!isValidName(data.name)) return res.status(400).send({status:false, msg: "write in required form"});

    if(!isValid(data.fullName)) return res.status(400).send({status: false, msg: "fullName can not be empty"});
    if(!isValidName(data.fullName)) return res.status(400).send({status:false, msg: "write fullName in required form"});
    

    if(!isValid(data.logoLink)) return res.status(400).send({status: false, msg: "url can not be empty"});
     
    if(!isValidUrl(data.logoLink)) return res.status(400).send({status:false, msg: "not a valid url"})





    let savedData = await collegeModel.create(data);

    return res.status(201).send({status: true , msg: savedData});
}



module.exports = { createCollege};
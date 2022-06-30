const { default: mongoose } = require("mongoose");
const collegeModel = require ("../model/collegeModel");
const internModel = require("../model/internModel");
const {isValid, isValidName, isValidUrl, isValidCollegeName, isValidEmail, isValidMobile} = require("../validator/validator");

const createIntern = async function(req,res){
    let data = req.body
    let mobile = data.mobile
    let email = data.email
    if(!isValid(data.collegeId)) return res.status(400).send({status: false, msg: "collegeId is required"})
    if(!mongoose.isValidObjectId(data.collegeId)) return res.status(400).send({status: false, msg: "please enter valid id"})
    let collegeid = await collegeModel.findById(data.collegeId)
    if(!collegeid) return res.status(404).send({status:false, msg: "college not found"})

    let mobileAndEmail = await internModel.findOne({$and: [{mobile: mobile,email:email}]})
    if(mobileAndEmail) return res.status(400).send({status:false, msg: "Either mobile No. or email is already registered"})
    console.log(mobileAndEmail)

    if(!isValid(data.name)) return res.status(400).send({status: false, msg: "name is required"})
    if(!isValidName(data.name)) return res.status(400).send({status:false, msg: "write name in required form"});

    if(!isValid(email)) return res.status(400).send({status: false, msg: "email can not be empty"});
    if(!isValidEmail(email)) return res.status(400).send({status: false, msg: "write email in required form"})
    
    if(!isValid(mobile)) return res.status(400).send({status: false, msg: "mobile can not be empty"});
    if(!isValidMobile(mobile)) return res.status(400).send({status: false, msg: "write mobile no. in required form"})







    let savedData = await internModel.create(data)
    return res.status(201).send({status: true, msg: savedData})

}

const getCollege = async function (req, res) {
    try{
    let collegeName = req.query.name
    let query=req.query
    let data = Object.keys(query)
    if (!data.length) return res.status(400).send({ status: false, msg: "Data can not be empty" });
    if (!isValidCollegeName(query.name)) return res.status(400).send({ status: false, msg: "collegeName is not valid" });

    let collegeDetail = await collegeModel.findOne({ name: collegeName })
    console.log(collegeDetail)
    let collegeid = collegeDetail._id
    console.log(collegeid)
    let interns = await internModel.find({ collegeId: collegeid, isDeleted: false }, { name: 1, email: 1, mobile: 1 })

   
    if(!interns.length) return res.status(404).send({status:false, msg: "No Intern Associated With This College"})
    console.log(interns)
    return res.status(200).send({ data: { name: collegeDetail.name, fullName: collegeDetail.fullName, logoLink: collegeDetail.logoLink, interns: interns } })



    } catch(err){
        return res.status(500).send({status:false, msg: err.message})
    }


}


module.exports = {createIntern,getCollege}
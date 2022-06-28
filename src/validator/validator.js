// const { url } = require("inspector");

const isValidName=(name)=>{
    if(/^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/.test(name))
    return true
};

const isValid=(value)=>{
    if(typeof value==="undefined" || value=== null ) return false
    if(typeof value==="string" && value.trim().length===0) return false //
    return true
};

const isValidUrl = (logoLink)=>{
    if(/(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-/]))?/.test(logoLink))
    return true
}

const isValidMobile = (mobile)=> {
    if(/^(\+\d{1,3}[- ]?)?\d{10}$/.test(mobile))
    return true
}

const isValidEmail=(email)=>{
    if (/^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/.test(email))
    return true
}


module.exports = {
    isValidName, isValid, isValidUrl, isValidMobile, isValidEmail
}
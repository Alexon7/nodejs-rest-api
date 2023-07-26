

const { Contact } = require("../models/contact");
const { RequestError } = require("../helpers/index");
const { crtlWrapper } = require("../helpers/index");




const getAllContacts =async (req, res) => {
     const { _id: owner } = req.user;
    const { page = 1, limit = 10, favorite = true} = req.query;
    const skip = (page - 1) * limit;
        const result = await Contact.find({ owner }, "", { skip, limit: Number(limit), favorite })
        .populate("owner", "email"); 
    res.json(result);
}

const getById = async (req, res) => {
     const { contactId } = req.params;
    const result = await Contact.findById(contactId);
    if (!result) {
      throw RequestError(404, "Not found");
    }
    res.json(result);  
}

const add = async (req, res) => {  
   const {_id: owner} = req.user;
  const result = await Contact.create({ ...req.body, owner });
        res.status(201).json(result);
}
 
const remove = async (req, res) => {
      const { contactId } = req.params;
    const result = await Contact.findByIdAndRemove(contactId);
    if (!result) {
      throw RequestError(404, "Not found");
    }
    res.json({ "message": "contact deleted" });
 }

const updateById = async (req, res) => {
       const { contactId } = req.params;
    const result = await Contact.findByIdAndUpdate(contactId, req.body, {new:true});
    if (!result) {
      throw RequestError(404, "Not found");
    }
    res.json(result);
 
}

const updateStatusContact = async (req, res) => {
       const { contactId } = req.params;
    const result = await Contact.findByIdAndUpdate(contactId, req.body, {new:true});
    if (!result) {
      throw RequestError(404, "Not found");
    }
    res.status(200).json(result);
 
}

module.exports = {
    getAllContacts: crtlWrapper(getAllContacts),
    getById: crtlWrapper(getById),
    add: crtlWrapper(add),
    remove: crtlWrapper(remove),
    updateById: crtlWrapper(updateById),
    updateStatusContact:crtlWrapper(updateStatusContact),
}
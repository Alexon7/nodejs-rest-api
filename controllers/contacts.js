

const Contact = require("../models/contact");
const { RequestError } = require("../helpers/index");
const { crtlWrapper } = require("../helpers/index");




const getAllContacts =async (req, res) => {
     const result = await Contact.find(); 
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
          const result = await Contact.create(req.body);
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

const updateFavorite = async (req, res) => {
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
    updateFavorite:crtlWrapper(updateFavorite),
}
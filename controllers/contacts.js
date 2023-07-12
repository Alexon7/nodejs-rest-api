

const contacts = require("../models/contacts");
const { RequestError, crtlWrapper } = require("../helpers/index");




const getAllContacts =async (req, res, next) => {
     const result = await contacts.listContacts(); 
    res.json(result);
}

const getById = async (req, res, next) => {
     const { contactId } = req.params;
    const result = await contacts.getContactById(contactId);
    if (!result) {
      throw RequestError(404, "Not found");
    }
    res.json(result);  
}

const add = async (req, res) => {  
          const result = await contacts.addContact(req.body);
        res.status(201).json(result);
}
 
const remove = async (req, res) => {
      const { contactId } = req.params;
    const result = await contacts.removeContact(contactId);
    if (!result) {
      throw RequestError(404, "Not found");
    }
    res.json({ "message": "contact deleted" })
 }

const updateById = async (req, res, next) => {
       const { contactId } = req.params;
    const result = await contacts.updateContact(contactId, req.body);
    if (!result) {
      throw RequestError(404, "Not found");
    }
    res.json(result);
 
}

module.exports = {
    getAllContacts: crtlWrapper(getAllContacts),
    getById: crtlWrapper(getById),
    add: crtlWrapper(add),
    remove: crtlWrapper(remove),
    updateById: crtlWrapper(updateById),
}
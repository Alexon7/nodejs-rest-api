const express = require('express');
const Joi = require('joi');

const contacts = require("../../models/contacts");
const { RequestError } = require("../../helpers/RequestError");

const router = express.Router();

const contactSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
    phone: Joi.string().required(),
})

router.get('/', async (req, res, next) => {
  try {
    const result = await contacts.listContacts(); 
     res.json(result)
  } catch(error) {
    next(error)
  }
 
})

router.get('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await contacts.getByld(contactId);
    if (!result) {
      throw RequestError(404, "Not found");
    }
    res.json(result);
  } catch (error) {
    next(error);
}
 
})

router.post('/', async (req, res, next) => {
  try {
    const { error } = contactSchema.validate(req.body);  
      if(error) {
            throw RequestError(400, error.message);
        }
        const result = await contacts.addContact(req.body);
        res.status(201).json(result);

} catch (error) {
    next(error);
}
 })

router.delete('/:contactId', async (req, res, next) => {
  res.json({ message: 'template message' })
})

router.put('/:contactId', async (req, res, next) => {
  res.json({ message: 'template message' })
})

module.exports = router

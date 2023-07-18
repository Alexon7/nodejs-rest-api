const express = require('express');

const router = express.Router();

const ctrl = require("../../controllers/contacts");

const { validateBody } = require("../../middlewares");

const schemas = require("../../schemas/contacts");

router.get('/', ctrl.getAllContacts);

// router.get('/:contactId', ctrl.getById);

// router.post('/', validateBody(schemas.contactSchema), ctrl.add);


// router.delete('/:contactId', ctrl.remove);
  

// router.put('/:contactId',validateBody(schemas.contactSchema), ctrl.updateById);

  module.exports = router

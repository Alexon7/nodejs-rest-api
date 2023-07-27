const express = require('express');

const router = express.Router();

const ctrl = require("../../controllers/contacts");

const { validateBody, isValidId, isEmptyBody, authenticate} = require("../../middlewares");

const { schemas } = require("../../models/contact");

router.get('/',authenticate, ctrl.getAllContacts);

router.get('/:contactId',authenticate, isValidId, ctrl.getById);

router.post('/',authenticate,  validateBody(schemas.contactAddSchema), ctrl.add);


router.delete('/:contactId',authenticate, isValidId, ctrl.remove);
  

router.put('/:contactId',authenticate,  isValidId, validateBody(schemas.contactAddSchema), ctrl.updateById);

router.patch('/:contactId/favorite',authenticate, isEmptyBody, isValidId, validateBody(schemas.updateFavoriteSchema), ctrl.updateStatusContact);

  module.exports = router

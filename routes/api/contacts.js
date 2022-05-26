const express = require('express');
const { contacts: ctrl } = require('../../controllers');
const { auth, ctrlWrapper } = require('../../middlewares');

const router = express.Router();

router.get('/', auth, ctrlWrapper(ctrl.getAll));

router.get('/:contactId', ctrlWrapper(ctrl.getById));

router.post('/', auth, ctrlWrapper(ctrl.add));

router.delete('/:contactId', ctrlWrapper(ctrl.removeById));

router.put('/:contactId', ctrlWrapper(ctrl.updateById));

router.patch('/:contactId/favorite', ctrlWrapper(ctrl.updateStatusContact));

module.exports = router;

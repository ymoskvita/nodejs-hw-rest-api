const express = require('express');
const { auth: ctrl } = require('../../controllers');
const { auth, ctrlWrapper } = require('../../middlewares');

const router = express.Router();

router.post('/signup', ctrlWrapper(ctrl.signup));
router.post('/login', ctrlWrapper(ctrl.login));
router.post('/logout', auth, ctrlWrapper(ctrl.logout));


module.exports = router;
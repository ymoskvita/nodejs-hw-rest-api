const express = require('express');
const { users: ctrl } = require('../../controllers');
const { auth, ctrlWrapper } = require('../../middlewares');

const router = express.Router();

router.get('/current', auth, ctrlWrapper(ctrl.getCurrent));
router.patch('/subscription', auth, ctrlWrapper(ctrl.updateSubscription));
router.post('/verify', ctrlWrapper(ctrl.verify));
router.get('/verify/:verificationToken', ctrlWrapper(ctrl.verifyEmail));

module.exports = router;
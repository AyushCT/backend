const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');


router.get('/', authMiddleware.verifyAuthToken, userController.getAllUsers);
router.put('/:userId/role', authMiddleware.verifyAuthToken, userController.updateUserRole);
router.post('/role', authMiddleware.verifyAuthToken, userController.createRole);
router.put('/role/:roleId', authMiddleware.verifyAuthToken,userController.updateRole);

module.exports = router;

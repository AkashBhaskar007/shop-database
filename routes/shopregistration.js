const router = require('express').Router();
require('dotenv').config()

const { registerController,
    loginController,
    employeeController,
    productController,
    listProductsController } = require('../modules/controller')


router.post('/ownerRegister', registerController);

router.post('/login', loginController);

router.post('/employeeRegistration', employeeController);

router.post('/addProduct', profileDataService, productController);

router.get('/listProduct', listProductsController);


module.exports = router;
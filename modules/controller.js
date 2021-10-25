require('dotenv').config()
const { ownerDetails,
    createOwner,
    ownerLoginService,
    profileDataService,
    createProduct,
    showProductService } = require('./service')
const Owner = require('../models/owner')

exports.registerController = async (req, res) => {
    let { fullName, email, role, userName, password } = req.body;
    if (!fullName || !email || !role || !userName || !password) {
        return res.status(400).json({ message: "All fields have not been entered!" })
    }
    let owner = await ownerDetails(userName);
    if (owner) {
        return res.status(400).json({ message: "Username already taken, please try another" })
    }
    const newOwner = await createOwner({ fullName, email, role, userName, password })
    if (!newOwner)
        return res.json({ message: 'Owner not registered!' })
    return res.json({
        message: 'Owner Registered!',
        data: newOwner
    });
}

exports.loginController = async (req, res) => {
    let { userName, password } = req.body;
    if (!userName || !password) {
        return res.status(400).json({ message: "All fields are required!" })
    }
    let user = await ownerDetails(userName);
    if (user) {
        const ownerLogin = await ownerLoginService(userName, password)
        if (ownerLogin)
            return res.json({ message: "login Succesfful!", data: ownerLogin })
        return res.json({ message: "Invalid pasword!" })
    }
    else {
        return res.status(401).json({ message: "User not found!" })
    }
}


exports.employeeController = async (req, res) => {
    let token = req.headers.authorization;
    const profileData = await profileDataService(token)
    if (profileData.role == "owner") {
        let { fullName, email, role, userName, password } = req.body;
        if (!fullName || !email || !role || !userName || !password) {
            return res.status(400).json({ message: "All fields have not been entered!" })
        }
        let employee = await ownerDetails(userName);
        if (employee) {
            return res.status(400).json({ message: "Username already taken, please try another" })
        }
        const newEmployee = await createOwner({ fullName, email, role, userName, password })
        if (!newEmployee)
            return res.json({ message: 'Emoloyee not registered!' })
        return res.json({
            message: 'Emoloyee Registered!',
            data: newEmployee
        });

    } return res.json({
        message: "Not authorized to add employees!",
    })
}
exports.productController = async (req, res) => {
       if (req.user.role == "employee") {
        let { productName,
            productDescription,
            price } = req.body;
        if (!productName || !productDescription || !price)
            return res.status(400).json({ message: "All fields have not been entered!" })

        const newProduct = await createProduct({ productName, productDescription, price })
        if (!newProduct)
            return res.json({ message: 'Product not added!' })
        return res.json({
            message: 'Product added!',
            data: newProduct
        });
    }
    return res.json({
        message: "Sorry! Only employees can add products!",
    })
}


exports.listProductsController = async (req, res) => {
    const product = await showProductService();
    if (!product)
        return res.send({ message: 'No products added!' })
    return res.send({
        data: product
    })
}

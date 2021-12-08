const Owner = require('../models/owner')
const Product = require('../models/product')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

exports.ownerDetails = async (userName) => {
    const userData = await Owner.findOne({ userName })
    if (!userData)
        return false;
    return userData;
}
exports.createOwner = async (params) => {
    let { fullName,
        email,
        role,
        userName,
        password } = params;
    const passwordHash = await bcrypt.hash(password, 10);
    const newOwner = Owner.create({
        fullName,
        email,
        role,
        userName,
        password: passwordHash
    });
    if (!newOwner)
        return false;
    return newOwner;
}
exports.ownerLoginService = async (userName, password) => {

    let owner = await Owner.findOne({ userName })
    if (owner) {
        const passwordCheck = await bcrypt.compare(password, owner.password);
        if (passwordCheck) {
            let token = jwt.sign({
                id: owner._id,
                name: owner.fullName,
                role: owner.role
            }, process.env.SECRET)
            return token;

        } return false;
    }
}

exports.createProduct = async (params) => {
    let { productName,
        productDescription,
        price } = params;
    const newProduct = Product.create({
        productName,
        productDescription,
        price
    });
    if (!newProduct)
        return false;
    return newProduct;
}
exports.showProductService = async () => {
    const product = await Product.find();
    if (product=="")
        return false;
    return product;
}
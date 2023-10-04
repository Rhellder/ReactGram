const User = require("../models/User")
const jwt = require("jsonwebtoken")
const jwSecret = process.env.JWT_SECRET 

const authGugard = async (req, res, next) => {
    const authHeader = req.headers["authorization"]
    const token = authHeader && authHeader.split(" ")[1]

    //check if header has a token
    if(!token) return res.status(401).json({erros: ["Acesso negado"]})
    
    //check if token is valid
    try {
        const verified = jwt.verify(token, jwSecret)
        req.user = await User.findById(verified.id).select("-password")
        next()
    } catch (err) {
        res.status(401).json({errors: ["Token inválido"]})
    }
}

module.exports = authGugard
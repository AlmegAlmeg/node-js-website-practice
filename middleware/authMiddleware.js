const { verifyToken } = require('../config/jwt')

module.exports = async (req,res,next) => {
    try {
        const token = req.headers['x-auth-token']
        req.user = await verifyToken(token)
        next()
    } catch (err) {
        res.status(401).send('You must be logged in to be here')
    }
} 
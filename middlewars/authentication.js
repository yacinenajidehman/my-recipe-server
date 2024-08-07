const jwt = require('jsonwebtoken');

const isLoggedIn = (req, res, next) => {
    try{
        const token = req.headers.authorization;
        if(!token){
            return res.status(401).json({message: "لم يتم توفير رمز الدخول"});
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.currentUser = decoded;
        next()
    }catch (e) {
        return res.status(500).json(e)
    }
}

module.exports = isLoggedIn
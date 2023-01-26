import jwt from "jsonwebtoken";

// development purpose only, it's not hardcoded in production
const JWT_SEC = process.env.JWT_SEC || "JWTSecretKey";

export const varifyToken = (req,res,next) => {
    try {
        let token = req.headers.authorization
        if(!token) return res.status(401).send('authorization required.')
        let authToken = token.split(' ')[1]
        jwt.verify(authToken, JWT_SEC, (err, user) => {
            if(err) return res.status(403).send(err.message)
            req.user = user;
            next()
          });
    } catch (err) {
        
    }
}
import jwt from 'jsonwebtoken';

const isAuth = async (req, res, next) => {
   try {
     const authHeader = req.headers.authorization;
     if (!authHeader || !authHeader.startsWith('Bearer ')) {
         return res.status(401).json({ message: 'Authorization header missing or malformed' });
     }
     const token = authHeader.split(' ')[1];
     const decoded = jwt.verify(token, process.env.JWT_SECRET);
     if (!decoded) {
         return res.status(401).json({ message: 'Invalid or expired token' });
     }
     req.userId = decoded.userId
     next();
   } catch (error) {
        console.log("is Auth ERROR -> ",error);
        return res.status(401).json({ message: 'Authentication failed' });
   }
   
}

export default isAuth
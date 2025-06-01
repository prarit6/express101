import jwt from 'jsonwebtoken';

function authMiddleware(req, res, next) {
  const token = req.headers['authorization']?.split(' ')[1]; //Bearer jwt_token

  if (!token) {
    return res.status(401).json({
      status: 'Fail',
      code: 'UNAUTHORIZED',
      message: 'No token provided',
    });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({
        status: 'Fail',
        code: 'FORBIDDEN',
        message: 'Failed to authenticate token',
      });
    }
    
    req.user = user;
    next();
  });
}
export default authMiddleware;
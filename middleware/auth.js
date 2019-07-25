const config = require('config');
const jwt = require('jsonwebtoken');

const jwtSecret = process.env.jwtSecret || config.get('jwtSecret');

const auth = (req, res, next) => {
  const token = req.header('x-auth-token');

  //check for token
  if (!token) return res.status(401).json({ msg: 'Access denied' });

  //Verify token
  try {
    const decoded = jwt.verify(token, jwtSecret);
    // Add user  from payload
    req.user = decoded;
    next();
  } catch (err) {
    res.status(400).json({ msg: 'Token not valid' });
  }

}

module.exports = auth;
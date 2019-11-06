const apiTokens = require('../config/tokens');

const auth = (req, res, next) => {
  const token = req.get('x-api-token');
  const authorize = apiTokens.includes(token);

  if (!token) {
    const missingToken = {
      success: false,
      message: 'Missing x-api-token',
    };
    res.status(403).send(JSON.stringify(missingToken));
  }

  if (authorize) {
    next();
  } else if (authorize === false) {
    const messageUnauth = {
      success: false,
      message: 'Unauthorized Token',
    };
    res.status(403).send(JSON.stringify(messageUnauth));
  }
};

module.exports = auth;

const jwt = require('jsonwebtoken');

const generateTokens = (user) => {
  const payload = { id: user.id, role: user.role };

  const accessToken = jwt.sign(
    payload,
    process.env.JWT_SECRET || 'secret',
    { expiresIn: '15m' } // 15 dakika geçerli
  );

  const refreshToken = jwt.sign(
    payload,
    process.env.JWT_REFRESH_SECRET || 'refresh_secret',
    { expiresIn: '7d' } // 7 gün geçerli
  );

  return { accessToken, refreshToken };
};

const verifyAccessToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET || 'secret');
};

const verifyRefreshToken = (token) => {
  return jwt.verify(token, process.env.JWT_REFRESH_SECRET || 'refresh_secret');
};

module.exports = {
  generateTokens,
  verifyAccessToken,
  verifyRefreshToken
};

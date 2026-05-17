const { verifyAccessToken } = require('../utils/jwt');

const protect = (req, res, next) => {
  try {
    let token;
    
    // Authorization başlığından token'ı al (Format: Bearer <token>)
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      return res.status(401).json({ status: 'error', message: 'Erişim reddedildi. Lütfen giriş yapın.' });
    }

    // Token'ı doğrula
    const decoded = verifyAccessToken(token);
    
    // Kullanıcı bilgisini request objesine ekle (İleriki middleware/controller'larda kullanmak için)
    req.user = decoded;
    
    next();
  } catch (error) {
    return res.status(401).json({ status: 'error', message: 'Geçersiz veya süresi dolmuş token.' });
  }
};

const restrictTo = (...roles) => {
  return (req, res, next) => {
    // req.user, "protect" middleware'inden geliyor
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ status: 'error', message: 'Bu işlemi yapmaya yetkiniz yok.' });
    }
    next();
  };
};

module.exports = {
  protect,
  restrictTo
};

const userService = require('../services/userService');

class UserController {
  async register(req, res) {
    try {
      const { name, email, password } = req.body;

      if (!name || !email || !password) {
        return res.status(400).json({ status: 'error', message: 'Lütfen tüm alanları doldurun.' });
      }

      const result = await userService.register({ name, email, password });
      
      res.status(201).json({
        status: 'success',
        message: 'Kullanıcı başarıyla kaydedildi.',
        data: result
      });
    } catch (error) {
      res.status(400).json({ status: 'error', message: error.message });
    }
  }

  async login(req, res) {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(400).json({ status: 'error', message: 'Lütfen email ve şifre girin.' });
      }

      const result = await userService.login(email, password);
      
      res.status(200).json({
        status: 'success',
        message: 'Giriş başarılı.',
        data: result
      });
    } catch (error) {
      res.status(401).json({ status: 'error', message: error.message });
    }
  }
}

module.exports = new UserController();

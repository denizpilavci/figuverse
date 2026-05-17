const bcrypt = require('bcryptjs');
const userRepository = require('../repositories/userRepository');
const { generateTokens } = require('../utils/jwt');

class UserService {
  async register(userData) {
    const { name, email, password } = userData;

    // Email kontrolü
    const existingUser = await userRepository.findByEmail(email);
    if (existingUser) {
      throw new Error('Bu email adresi zaten kullanımda.');
    }

    // Şifreyi hashle
    const salt = await bcrypt.genSalt(10);
    const password_hash = await bcrypt.hash(password, salt);

    // Kullanıcıyı veritabanına kaydet
    const newUser = await userRepository.create({
      name,
      email,
      password_hash
    });

    // Token oluştur
    const tokens = generateTokens(newUser);

    return {
      user: newUser,
      tokens
    };
  }

  async login(email, password) {
    // Kullanıcıyı bul
    const user = await userRepository.findByEmail(email);
    if (!user) {
      throw new Error('Geçersiz email veya şifre.');
    }

    // Şifreyi kontrol et
    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) {
      throw new Error('Geçersiz email veya şifre.');
    }

    // Şifre bilgisini döndürmemek için siliyoruz
    const { password_hash, ...userWithoutPassword } = user;

    // Token oluştur
    const tokens = generateTokens(userWithoutPassword);

    return {
      user: userWithoutPassword,
      tokens
    };
  }
}

module.exports = new UserService();

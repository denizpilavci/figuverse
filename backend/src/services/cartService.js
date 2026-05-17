const cartRepository = require('../repositories/cartRepository');
const productRepository = require('../repositories/productRepository');

class CartService {
  async getCart(userId) {
    const cart = await cartRepository.getCart(userId);
    
    // Sepetteki ürünlerin güncel bilgilerini veritabanından çekelim (Fiyat değişmiş olabilir, stok bitmiş olabilir)
    const populatedItems = [];
    let cartTotal = 0;

    for (let item of cart.items) {
      const product = await productRepository.findById(item.product_id);
      if (product) {
        populatedItems.push({
          product_id: product.id,
          name: product.name,
          image_url: product.image_url,
          unit_price: Number(product.price),
          quantity: item.quantity,
          subtotal: Number(product.price) * item.quantity,
          stock: product.stock // Frontend'in stok kontrolü yapabilmesi için
        });
        cartTotal += Number(product.price) * item.quantity;
      }
    }

    return {
      items: populatedItems,
      total: cartTotal
    };
  }

  async addItemToCart(userId, productId, quantity) {
    // Ürün veritabanında var mı ve yeterli stok var mı kontrol edelim
    const product = await productRepository.findById(productId);
    if (!product) throw new Error('Eklenecek ürün bulunamadı.');
    
    const cart = await cartRepository.getCart(userId);
    
    // Ürün sepette zaten varsa miktarını artır, yoksa yeni ekle
    const existingItemIndex = cart.items.findIndex(item => item.product_id === productId);
    
    let newQuantity = quantity;
    if (existingItemIndex > -1) {
      newQuantity = cart.items[existingItemIndex].quantity + quantity;
    }

    // Stok kontrolü
    if (newQuantity > product.stock) {
      throw new Error('Yeterli stok bulunmuyor.');
    }

    if (existingItemIndex > -1) {
      cart.items[existingItemIndex].quantity = newQuantity;
    } else {
      cart.items.push({ product_id: productId, quantity: newQuantity });
    }

    await cartRepository.saveCart(userId, cart);
    
    // Güncel detaylı sepeti dön
    return await this.getCart(userId);
  }

  async removeItemFromCart(userId, productId) {
    const cart = await cartRepository.getCart(userId);
    
    cart.items = cart.items.filter(item => item.product_id !== Number(productId));
    
    await cartRepository.saveCart(userId, cart);
    return await this.getCart(userId);
  }

  async clearCart(userId) {
    await cartRepository.clearCart(userId);
    return { items: [], total: 0 };
  }
}

module.exports = new CartService();
